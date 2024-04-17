import React, { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';

const useCustomToolTip = () => {
  const [tooltipContent, setTooltipContent] = useState(null);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const TooltipComponent = ({ children, title, ...props }) => {
    return (
      <Tooltip
        title={title}
        open={tooltipOpen}
        onClose={() => setTooltipOpen(false)}
        placement='top'
        {...props}
      >
        {children}
      </Tooltip>
    );
  };

  const showTooltip = (content) => {
    setTooltipContent(content);
    setTooltipOpen(true);
  };

  return { TooltipComponent, showTooltip };
};

export default useCustomToolTip;
