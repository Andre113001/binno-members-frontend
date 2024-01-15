import React from 'react';

function extractVideoCode(link) {
  if (typeof link !== 'string') {
    // Handle invalid input
    return null;
  }

  const regex = /(?:\?v=|\/embed\/|\/watch\?v=|youtu.be\/|\/v\/|\/e\/|\?v%3D|\/videos\/)([a-zA-Z0-9_-]{11})/;
  const match = link.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    // Handle invalid or unsupported links
    return null;
  }
}

const YoutubeEmbed = (props) => {
  const videoCode = extractVideoCode(props.videoLink);

  if (!videoCode) {
    return <div>Invalid or unsupported YouTube link</div>;
  }

  return (
    <div>
      <iframe
        title="YouTube Video"
        width="1400"
        height="720"
        src={`https://www.youtube.com/embed/${videoCode}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeEmbed;
