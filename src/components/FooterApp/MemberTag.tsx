import React from 'react';

interface TeamMember {
  gitHubProfile: string;
  name: string;
}

function MemberTag({ gitHubProfile, name }: TeamMember) {
  return (
    <a
      className="git-link"
      key={gitHubProfile}
      href={gitHubProfile}
      target="_blank"
      rel="noreferrer"
    >
      <span className="git-logo"></span>
      <span className="user-name">{name}</span>
    </a>
  );
}

export default MemberTag;
