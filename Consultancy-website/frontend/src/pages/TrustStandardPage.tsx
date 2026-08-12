import React from 'react';
import { TrustStandardSection } from '../components/TrustStandardSection';

interface TrustStandardPageProps {
  onOpenCounselling: () => void;
}

export const TrustStandardPage: React.FC<TrustStandardPageProps> = ({ onOpenCounselling }) => {
  return (
    <div className="animate-fadeIn">
      <TrustStandardSection onOpenCounselling={onOpenCounselling} fullPage={true} />
    </div>
  );
};
