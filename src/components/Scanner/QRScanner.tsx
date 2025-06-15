
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScanQrCode, Camera, AlertCircle } from 'lucide-react';

interface QRScannerProps {
  onScan: (data: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasCamera, setHasCamera] = useState(true);

  const startScanner = async () => {
    try {
      setError(null);
      setIsScanning(true);

      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError('Camera not supported by this browser');
        setHasCamera(false);
        setIsScanning(false);
        return;
      }

      // Check if camera is available
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      
      if (videoDevices.length === 0) {
        setHasCamera(false);
        setError('No camera available');
        setIsScanning(false);
        return;
      }

      console.log('Requesting camera access...');

      // Request camera access with optimized constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 }
        }
      });

      console.log('Camera access granted, setting up video stream...');

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Handle video loading with better error handling
        videoRef.current.onloadedmetadata = () => {
          console.log('Video metadata loaded');
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => {
                console.log('Video playing successfully');
                setError(null);
              })
              .catch(err => {
                console.error('Error playing video:', err);
                setError('Failed to start camera playback');
                setIsScanning(false);
              });
          }
        };

        videoRef.current.onerror = (err) => {
          console.error('Video error:', err);
          setError('Video stream error');
          setIsScanning(false);
        };
      }

    } catch (err: any) {
      console.error('Camera access error:', err);
      
      if (err.name === 'NotAllowedError') {
        setError('Camera access denied. Please allow camera permission and try again.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found on this device');
        setHasCamera(false);
      } else if (err.name === 'NotReadableError') {
        setError('Camera is being used by another application');
      } else {
        setError('Error accessing camera - please check permissions');
      }
      
      setIsScanning(false);
    }
  };

  const stopScanner = () => {
    console.log('Stopping camera...');
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => {
        track.stop();
        console.log('Camera track stopped');
      });
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const simulateQRScan = () => {
  setError("Simulation is disabled. Please connect a real scanner.");
};


  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-2 mb-4">
        <ScanQrCode className="w-6 h-6" />
        <h3 className="text-lg font-semibold">QR Code Scanner</h3>
      </div>

      <Card className="max-w-md mx-auto">
        <CardContent className="p-4">
          {isScanning ? (
            <div className="space-y-4">
              <video
                ref={videoRef}
                className="w-full h-48 bg-black rounded-lg"
                autoPlay
                playsInline
                muted
              />
              <div className="flex gap-2">
                <Button onClick={stopScanner} variant="outline" className="flex-1">
                  Stop Camera
                </Button>
                <Button onClick={simulateQRScan} className="flex-1">
                  Simulate Scan
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Point camera at QR code to scan
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
              <Button onClick={startScanner} className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Start Camera
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {!hasCamera && !isScanning && (
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto" />
            <div>
              <h4 className="font-medium mb-2">Camera Not Available</h4>
              <p className="text-sm text-gray-600 mb-4">
                You can use the simulation button to test the functionality
              </p>
              <Button onClick={simulateQRScan} className="w-full">
                <ScanQrCode className="w-4 h-4 mr-2" />
                Simulate QR Scan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="text-red-600 text-sm flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
};

export default QRScanner;
