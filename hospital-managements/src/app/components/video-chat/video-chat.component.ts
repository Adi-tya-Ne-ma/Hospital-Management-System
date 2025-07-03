import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { SignalingService } from '../../service/video-call/signaling.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.css'],
  imports: [CommonModule],
})
export class VideoChatComponent implements OnInit, OnDestroy {
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  public peerConnection!: RTCPeerConnection;
  public localStream!: MediaStream;
  public roomId: string = ''; // <-- ADD THIS LINE
  public role: string = '';

  // UI state variables
  callActive: boolean = false;
  isAudioMuted: boolean = false;
  isVideoOff: boolean = false;

  constructor(private router: Router, private signaling: SignalingService) {}

  async ngOnInit() {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      this.localVideo.nativeElement.srcObject = this.localStream;

      // Get roomId from navigation state
      const nav = this.router.getCurrentNavigation();
      if (nav?.extras.state) {
        this.roomId = nav.extras.state['appointmentId'] || '';
        this.role = nav.extras.state['role'] || '';
      } else if (history.state) {
        this.roomId = history.state['appointmentId'] || '';
        this.role = history.state['role'] || '';
      }
      console.log('Joining room:', this.roomId, 'as', this.role);

      this.setupPeerConnection();
      this.listenToSignals();

      // Use roomId in your signaling service to join the same room
      this.signaling.joinRoom(this.roomId);
    } catch (error) {
      console.error('Error accessing media devices:', error);
      alert(
        'Failed to access camera and microphone. Please ensure you have granted permission.'
      );
    }
  }

  ngOnDestroy() {
    this.cleanupResources();
  }

  setupPeerConnection() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
      ],
    });

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.signaling.emit('ice-candidate', {
          roomId: this.roomId, // always include roomId!
          candidate: event.candidate,
        });
      }
    };

    this.peerConnection.ontrack = (event) => {
      this.remoteVideo.nativeElement.srcObject = event.streams[0];
    };

    this.peerConnection.onconnectionstatechange = () => {
      if (this.peerConnection.connectionState === 'connected') {
        this.callActive = true;
      } else if (
        ['disconnected', 'failed', 'closed'].includes(
          this.peerConnection.connectionState
        )
      ) {
        this.callActive = false;
      }
    };

    this.localStream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, this.localStream);
    });
  }

  listenToSignals() {
    this.signaling.on('offer', async (data: any) => {
      console.log('Received offer:', data);
      try {
        await this.peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.offer)
        );
        const answer = await this.peerConnection.createAnswer();
        await this.peerConnection.setLocalDescription(answer);
        this.signaling.emit('answer', { roomId: this.roomId, answer }); // include roomId!
        this.callActive = true;
      } catch (error) {
        console.error('Error handling offer:', error);
      }
    });

    this.signaling.on('answer', async (data: any) => {
      console.log('Received answer:', data);
      try {
        await this.peerConnection.setRemoteDescription(
          new RTCSessionDescription(data.answer)
        );
      } catch (error) {
        console.error('Error handling answer:', error);
      }
    });

    this.signaling.on('ice-candidate', async (data: any) => {
      console.log('Received ICE candidate:', data);
      try {
        if (
          this.peerConnection &&
          this.peerConnection.signalingState !== 'closed'
        ) {
          await this.peerConnection.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
        }
      } catch (error) {
        console.error('Error adding ICE candidate:', error);
      }
    });

    this.signaling.on('hangup', () => {
      this.handleRemotePeerHangup();
    });
  }

  async callPeer() {
    try {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      this.signaling.emit('offer', { roomId: this.roomId, offer }); // include roomId!
      this.callActive = true;
    } catch (error) {
      console.error('Error initiating call:', error);
      alert('Failed to initiate call. Please try again.');
    }
  }

  hungUp() {
    this.signaling.emit('hangup', { roomId: this.roomId });
    this.cleanupResources();
    this.router.navigate(['/dashboard'], {
      state: { doctor: history.state.doctor },
    });
  }

  handleRemotePeerHangup() {
    alert('The remote peer has ended the call.');
    this.cleanupResources();
    this.router.navigate(['/dashboard'], {
      state: { doctor: history.state.doctor },
    });
  }

  cleanupResources() {
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => track.stop());
    }
    if (this.peerConnection) {
      this.peerConnection.close();
    }
    this.callActive = false;
  }

  toggleAudio() {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        this.isAudioMuted = !audioTrack.enabled;
      }
    }
  }

  toggleVideo() {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        this.isVideoOff = !videoTrack.enabled;
      }
    }
  }
}
