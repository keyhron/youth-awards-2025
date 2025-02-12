"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Button from "../atoms/Button";

const URL_RADIO = "https://serverstreamgroup.biz:8042/stream";

interface RadioPlayerProps {
  onClose?: () => void;
  autoPlay?: boolean;
}

const RadioPlayer = ({ onClose }: RadioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? volume : 0;
    }
  }, [audioRef, volume, isMuted]);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const toggleMuted = () => {
    setIsMuted(!isMuted);
  };

  const handlePlay = () => {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.src = URL_RADIO; // Reiniciar la fuente del audio para asegurar que esté en vivo
    audioRef.current.play().catch(() => {
      audioRef?.current?.pause();
      setIsPlaying(false);
    });

    setIsPlaying(true);
  };

  const handlePause = () => {
    if (!audioRef.current) {
      return;
    }
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const togglePlayPause = isPlaying ? handlePause : handlePlay;

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(+event.target.value);
  };

  return (
    <div className="fixed z-50 bottom-0 left-0 rounded-t-md w-full shadow-md bg-white text-black p-4 flex flex-col gap-3 md:max-w-[24rem] md:left-auto md:bottom-10 md:right-10 md:rounded-md">
      <audio ref={audioRef} autoPlay={false} onLoadedData={handleLoadedData}>
        <source src={URL_RADIO} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="flex items-center justify-between">
        <h6>Radio Luz 102.1 FM</h6>

        {onClose && (
          <button className="p-2 cursor-pointer" onClick={onClose}>
            <MdClose size={20} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between">
        {isLoading ? (
          <p>Cargando radio...</p>
        ) : (
          <>
            <div className="flex items-center gap-0.5">
              <Button
                className="p-2"
                variant="secondary"
                label={isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
                onClick={togglePlayPause}
              />

              <Button
                className="p-2"
                variant="secondary"
                label={
                  !isMuted ? (
                    <FaVolumeUp size={14} />
                  ) : (
                    <FaVolumeMute size={14} />
                  )
                }
                onClick={toggleMuted}
              />
            </div>

            {!isMuted && (
              <input
                type="range"
                value={volume}
                min="0"
                max="1"
                step="0.01"
                onChange={handleVolumeChange}
                className="custom-range max-w-[10rem]"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RadioPlayer;
