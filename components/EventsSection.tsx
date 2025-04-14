'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface ApplicationForm {
  name: string;
  email: string;
  yearOfStudy: string;
  program: string;
  motivation: string;
  linkedin: string;
  github: string;
}

const initialFormState: ApplicationForm = {
  name: '',
  email: '',
  yearOfStudy: '',
  program: '',
  motivation: '',
  linkedin: '',
  github: ''
};

const EventModal = ({ isOpen, onClose, children, showApplyButton, onApply }: { 
  isOpen: boolean; 
  onClose: () => void; 
  children: React.ReactNode;
  showApplyButton?: boolean;
  onApply?: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#2a2a2a] rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          {children}
          <div className="flex gap-4 mt-6">
            {showApplyButton && (
              <button
                onClick={onApply}
                className="flex-1 px-4 py-2 bg-[#c8102e] text-white rounded-md hover:bg-[#a00d24] transition-colors"
              >
                Apply Now
              </button>
            )}
            <button
              onClick={onClose}
              className={`px-4 py-2 bg-[#c8102e] text-white rounded-md hover:bg-[#a00d24] transition-colors ${showApplyButton ? 'flex-1' : 'w-full'}`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ApplicationForm = ({ eventId, onClose }: { eventId: number; onClose: () => void }) => {
  const [formData, setFormData] = useState<ApplicationForm>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addDoc(collection(db, 'vantel'), {
        ...formData,
        eventId,
        submittedAt: new Date().toISOString()
      });
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-white mb-2">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-[#1a1a1a] text-white rounded-md border border-white/10 focus:outline-none focus:border-[#c8102e]"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-white mb-2">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-[#1a1a1a] text-white rounded-md border border-white/10 focus:outline-none focus:border-[#c8102e]"
        />
      </div>
      <div>
        <label htmlFor="yearOfStudy" className="block text-white mb-2">Year of Study *</label>
        <input
          type="text"
          id="yearOfStudy"
          name="yearOfStudy"
          required
          value={formData.yearOfStudy}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-[#1a1a1a] text-white rounded-md border border-white/10 focus:outline-none focus:border-[#c8102e]"
        />
      </div>
      <div>
        <label htmlFor="program" className="block text-white mb-2">Program *</label>
        <input
          type="text"
          id="program"
          name="program"
          required
          value={formData.program}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-[#1a1a1a] text-white rounded-md border border-white/10 focus:outline-none focus:border-[#c8102e]"
        />
      </div>
      <div>
        <label htmlFor="motivation" className="block text-white mb-2">Motivation (Optional)</label>
        <textarea
          id="motivation"
          name="motivation"
          value={formData.motivation}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 bg-[#1a1a1a] text-white rounded-md border border-white/10 focus:outline-none focus:border-[#c8102e]"
        />
      </div>
      <div>
        <label htmlFor="linkedin" className="block text-white mb-2">LinkedIn *</label>
        <input
          type="url"
          id="linkedin"
          name="linkedin"
          required
          value={formData.linkedin}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-[#1a1a1a] text-white rounded-md border border-white/10 focus:outline-none focus:border-[#c8102e]"
        />
      </div>
      <div>
        <label htmlFor="github" className="block text-white mb-2">GitHub *</label>
        <input
          type="url"
          id="github"
          name="github"
          required
          value={formData.github}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-[#1a1a1a] text-white rounded-md border border-white/10 focus:outline-none focus:border-[#c8102e]"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-[#c8102e] text-white rounded-md hover:bg-[#a00d24] transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
      {submitStatus === 'success' && (
        <p className="text-green-500 text-center">Application submitted successfully!</p>
      )}
      {submitStatus === 'error' && (
        <p className="text-red-500 text-center">Error submitting application. Please try again.</p>
      )}
    </form>
  );
};

const EventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [showApplication, setShowApplication] = useState(false);

  const events = [
    {
      id: 1,
      title: "Vantel (YC 25)", 
      image: "/images/vantel.png",
      summary: "Join us for a talk with Vantel, one of three Swedish start-ups accepted into the latest batch of the prestigious Y Combinator.",
      details: `Join us for a talk with the amazing founding team of the AI start-up Vantel. 
Vantel was one of three Swedish start-ups that were accepted into the latest batch of the prestigious Silicon Valley start-up incubator Y-combinator. 

Come learn about entrepreneurship, AI and the future of work!
They are currently hiring a Founding Engineer and Interns, so take the chance to get to know the team!


23 April 2025
17:15 - 18:00
Sonja Lytkkens, Ångströmslaboratoriet`
    }
  ];

  return (
    <section id="events" className="py-16 bg-[#1a1a1a]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-white mb-3">Upcoming Events</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[#2a2a2a] rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => setSelectedEvent(event.id)}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={event.image}
                  alt={`${event.title} Event`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                <p className="text-white/80">{event.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <EventModal
        isOpen={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        showApplyButton={true}
        onApply={() => {
          setShowApplication(true);
          setSelectedEvent(null);
        }}
      >
        {selectedEvent && events.find(e => e.id === selectedEvent) && (
          <div>
            <div className="relative h-64 w-full mb-6">
              <Image
                src={events.find(e => e.id === selectedEvent)!.image}
                alt={`${events.find(e => e.id === selectedEvent)!.title} Event`}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              {events.find(e => e.id === selectedEvent)!.title}
            </h2>
            <p className="text-white/80 mb-4">
              {events.find(e => e.id === selectedEvent)!.summary}
            </p>
            <div className="border-t border-white/10 my-4"></div>
            <p className="text-white/80 whitespace-pre-line">
              {events.find(e => e.id === selectedEvent)!.details}
            </p>
          </div>
        )}
      </EventModal>

      <EventModal
        isOpen={showApplication}
        onClose={() => setShowApplication(false)}
      >
        <h2 className="text-2xl font-bold text-white mb-6">Apply for {events[0].title}</h2>
        <ApplicationForm eventId={events[0].id} onClose={() => setShowApplication(false)} />
      </EventModal>
    </section>
  );
};

export default EventsSection; 