import React from 'react'
import Youtube from 'react-youtube'

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
    
    const options = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
            controls: 1,
        },
    };

    return (
    <div>
        <Youtube videoId={videoCode} options={options} onReady={_onReady} id='video'/>
    </div>
  )

  function _onReady(event) {
    event.target.pauseVideo();
  }

  
}

export default YoutubeEmbed
