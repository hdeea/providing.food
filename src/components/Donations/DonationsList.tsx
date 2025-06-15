
import React from 'react';
import { DonationRequest } from '../../types';
import { Check, Clock, X } from 'lucide-react';
import { formatDateTime } from '../../utils/helpers';

interface DonationsListProps {
  donations: DonationRequest[];
}

const DonationsList: React.FC<DonationsListProps> = ({ donations }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check size={12} className="mr-1" />
            Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <X size={12} className="mr-1" />
            Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock size={12} className="mr-1" />
            Pending
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Your Donation Requests</h3>
      
      {donations.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500">No donation requests yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Click the + button to create a new donation request
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {donations.map((donation) => (
            <div
              key={donation.id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-sm text-gray-500">
                    Donation #{donation.id}
                  </span>
                </div>
                {getStatusBadge(donation.status)}
              </div>
              
              <div className="mb-2">
                <span className="font-medium">Quantity:</span>{' '}
                <span className="text-gray-800">{donation.quantity} meals</span>
              </div>
              
              <div className="mb-2">
                <span className="font-medium">Pickup:</span>{' '}
                <span className="text-gray-800">
                  {formatDateTime(donation.pickupDateTime)}
                </span>
              </div>
              
              {donation.description && (
                <div className="mt-2">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {donation.description}
                  </p>
                </div>
              )}
              
              <div className="mt-3 text-xs text-gray-400">
                Submitted on {formatDateTime(donation.createdAt)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationsList;
