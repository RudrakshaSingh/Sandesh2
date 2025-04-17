import { Calendar, CheckCircle,Mail, Plus, Send, Trash, Type, User } from "lucide-react";
import React, { useState } from "react";

function SendInvitation() {
  const [recipients, setRecipients] = useState([{ name: "", email: "" }]);
  const [message, setMessage] = useState("");
  const [template, setTemplate] = useState("");
  const [datetime, setDatetime] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const addRecipient = () => {
    setRecipients([...recipients, { name: "", email: "" }]);
  };

  const removeRecipient = (index) => {
    const newRecipients = [...recipients];
    newRecipients.splice(index, 1);
    setRecipients(newRecipients);
  };

  const updateRecipient = (index, field, value) => {
    const newRecipients = [...recipients];
    newRecipients[index][field] = value;
    setRecipients(newRecipients);
  };

  const handleSend = async () => {
    // Form validation
    const hasEmptyFields = recipients.some(r => !r.name || !r.email);
    if (hasEmptyFields || !message || !template || !datetime) {
      setStatus({
        type: "error",
        message: "Please fill in all required fields"
      });
      return;
    }

    setIsSending(true);
    setStatus({ type: "", message: "" });

    const invitationData = {
      recipients,
      message,
      template,
      datetime
    };

    try {
      const response = await fetch("/api/send-bulk-invitation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invitationData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: result.message || `Invitations sent to ${recipients.length} recipients!`
        });
        // Optional: reset form after successful submission
        // setRecipients([{ name: "", email: "" }]);
        // setMessage("");
        // setTemplate("");
        // setDatetime("");
      } else {
        setStatus({
          type: "error",
          message: result.message || "Failed to send invitations"
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Network error. Please try again."
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-xl rounded-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
        <Mail className="mr-2" size={20} />
        Send Multiple Invitations
      </h2>

      {status.message && (
        <div
          className={`mb-4 p-3 rounded-md ${
            status.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          <div className="flex items-center">
            {status.type === "success" && <CheckCircle className="mr-2" size={16} />}
            {status.message}
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-gray-800">Recipients*</h3>
            <button
              type="button"
              onClick={addRecipient}
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus size={16} className="mr-1" />
              Add Recipient
            </button>
          </div>

          {recipients.map((recipient, index) => (
            <div key={index} className="mb-3 p-3 border border-gray-200 rounded-md bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Recipient #{index + 1}</span>
                {recipients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRecipient(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="text-gray-400" size={16} />
                    </div>
                    <input
                      type="text"
                      placeholder="Name"
                      value={recipient.name}
                      onChange={(e) => updateRecipient(index, "name", e.target.value)}
                      className="pl-10 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="text-gray-400" size={16} />
                    </div>
                    <input
                      type="email"
                      placeholder="Email"
                      value={recipient.email}
                      onChange={(e) => updateRecipient(index, "email", e.target.value)}
                      className="pl-10 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Message*
          </label>
          <textarea
            placeholder="Type your invitation message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="text-gray-400" size={16} />
              </div>
              <input
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                className="pl-10 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Template*
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Type className="text-gray-400" size={16} />
              </div>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="pl-10 p-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">Select template</option>
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday</option>
                <option value="festive">Festive</option>
                <option value="corporate">Corporate</option>
                <option value="casual">Casual</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleSend}
            disabled={isSending}
            className={`w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200
              ${isSending ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            {isSending ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2" size={16} />
                Send {recipients.length > 1 ? `${recipients.length} Invitations` : "Invitation"}
              </>
            )}
          </button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          <p>Fields marked with * are required</p>
          <p className="mt-1">All recipients will receive the same message, template, and event time</p>
        </div>
      </div>
    </div>
  );
}

export default SendInvitation;