const Video = ({ link }: { link: string }) => {
  return (
    <iframe
      className="w-full aspect-video"
      src={link}
      title="Profile Company Finansist International"
      style={{ border: 'none' }}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
};

export default Video;
