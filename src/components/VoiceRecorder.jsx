// @ts-ignore;
import React, { useState, useRef, useEffect } from 'react';
// @ts-ignore;
import { Mic, MicOff, Send } from 'lucide-react';

export function VoiceRecorder({
  onRecordingComplete,
  disabled = false
}) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const streamRef = useRef(null);
  const animationFrameRef = useRef(null);
  const timerRef = useRef(null);
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = event => {
        audioChunksRef.current.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav'
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        onRecordingComplete && onRecordingComplete({
          blob: audioBlob,
          url: audioUrl,
          duration: recordingTime
        });
      };
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // 开始计时
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      // 音频级别可视化
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      const updateAudioLevel = () => {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        setAudioLevel(average / 255);
        animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
      };
      updateAudioLevel();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setAudioLevel(0);
    }
  };
  const togglePause = () => {
    if (mediaRecorderRef.current) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        timerRef.current = setInterval(() => {
          setRecordingTime(prev => prev + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
      setIsPaused(!isPaused);
    }
  };
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  return <div className="flex items-center space-x-2">
      {!isRecording ? <button onClick={startRecording} disabled={disabled} className={`p-3 rounded-full transition-colors ${disabled ? 'bg-gray-200 text-gray-400' : 'bg-red-500 hover:bg-red-600 text-white'}`}>
          <Mic className="w-5 h-5" />
        </button> : <div className="flex items-center space-x-2 bg-red-50 rounded-full p-2">
          {/* 音频级别指示器 */}
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => <div key={i} className={`w-1 h-4 rounded-full transition-all ${audioLevel > i / 5 ? 'bg-red-500' : 'bg-gray-300'}`} />)}
          </div>
          
          {/* 录音时间 */}
          <span className="text-sm text-red-600 font-medium min-w-[40px]">
            {formatTime(recordingTime)}
          </span>
          
          {/* 暂停/继续按钮 */}
          <button onClick={togglePause} className="p-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white">
            {isPaused ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>
          
          {/* 停止按钮 */}
          <button onClick={stopRecording} className="p-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white">
            <Send className="w-4 h-4" />
          </button>
        </div>}
    </div>;
}