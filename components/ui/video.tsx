const Video = () => {
  return (
    <video controls preload="metadata" className="aspect-video w-screen md:max-w-4xl">
      <source src="/videos/video-finansist-international.mp4" type="video/mp4" />
      <source src="/videos/video-finansist-international.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;
