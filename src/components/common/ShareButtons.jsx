import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  EmailIcon
} from 'react-share';

const ShareButtons = ({ url, title, description }) => {
  const shareUrl = url || window.location.href;
  const shareTitle = title || 'Check out this course on RN Classes';
  const shareDescription = description || 'Learn from expert instructors';

  return (
    <div className="flex space-x-2">
      <FacebookShareButton url={shareUrl} quote={shareTitle}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={shareTitle}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <LinkedinShareButton
        url={shareUrl}
        title={shareTitle}
        summary={shareDescription}
        source="RN Classes"
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <WhatsappShareButton url={shareUrl} title={shareTitle} separator=":: ">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <EmailShareButton
        url={shareUrl}
        subject={shareTitle}
        body={`${shareDescription}\n\nCheck out this course: ${shareUrl}`}
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  );
};

export default ShareButtons;