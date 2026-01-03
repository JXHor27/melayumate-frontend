import React from 'react';

const commonProps = {
  xmlns: "http://www.w3.org/2000/svg",
  className: "h-6 w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: 2,
};

export const LessonIcon = () => (
  <svg {...commonProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.5M4 6.253h8M4 17.753h8M16 6.253H12M16 17.753H12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6.253a2 2 0 012-2h4a2 2 0 012 2v11.5a2 2 0 01-2 2H6a2 2 0 01-2-2V6.253z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253a2 2 0 00-2-2h-4a2 2 0 00-2 2v11.5a2 2 0 002 2h4a2 2 0 002-2V6.253z" />
  </svg>
);

export const FlashcardIcon = () => (
  <svg {...commonProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 9.75h10.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75v5.25" />
  </svg>
);

export const SituationIcon = () => (
  <svg {...commonProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const CharacterIcon = () => (
    <svg {...commonProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 9.75h.008v.008H9v-.008zm6 0h.008v.008H15v-.008z" />
    </svg>
);

export const BattleIcon = () => (
  <svg {...commonProps}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const GuideIcon = () => (
    <svg {...commonProps}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);
