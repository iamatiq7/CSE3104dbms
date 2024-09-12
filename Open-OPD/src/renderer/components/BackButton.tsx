import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      className="btn normal-case text-xl mt-2 ml-5"
      type="button"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
}

export default BackButton;
