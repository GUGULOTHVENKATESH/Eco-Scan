import React, { useState } from 'react';
import { MessageCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Feedback submitted!');
    setFeedback('');
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <MessageCircle className="w-6 h-6 mr-2" />
        Share Your Feedback
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-4 border rounded-lg resize-none"
          rows="5"
          placeholder="Tell us what you think..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <button
          type="submit"
          className="mt-4 flex items-center bg-eco-green-600 hover:bg-eco-green-700 text-white px-4 py-2 rounded-lg"
        >
          <Send className="w-4 h-4 mr-2" />
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
