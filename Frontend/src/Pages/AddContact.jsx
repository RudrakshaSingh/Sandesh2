import {  Check, Edit, Info,  MapPin, Phone, Plus, Search,  Trash2,  Upload, User, Users, X } from "lucide-react";
import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addContact, deleteContact,getContacts, updateContact } from "../Redux/Slices/ContactAuth";

function AddContact() {
  const dispatch = useDispatch();
  const { contact = [] } = useSelector((state) => state?.contactAuth);

  // Fetch contacts on component mount
  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  console.log('contact', contact);

  const [contacts, setContacts] = useState([]);

  // Update contacts state when contact from redux changes
  useEffect(() => {
    if (contact && contact.length > 0) {
      setContacts(contact);
      setFilteredContacts(contact);
    }
  }, [contact]);

  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    relation: '',
    address: ''
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [expandedContact, setExpandedContact] = useState(null);
  const relationOptions = ["Friend", "Family", "Relative", "Other"];

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(query) ||
        contact.mobileNumber.includes(query) ||
        contact.relation.toLowerCase().includes(query) ||
        (contact.address && contact.address.toLowerCase().includes(query))
      );
      setFilteredContacts(filtered);
    }
  };

  // Toggle expanded contact details
  const toggleContactDetails = (contactId) => {
    if (expandedContact === contactId) {
      setExpandedContact(null);
    } else {
      setExpandedContact(contactId);
    }
  };

  // Handle edit contact
  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      mobileNumber: contact.mobileNumber,
      relation: contact.relation,
      address: contact.address || ''
    });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingContact(null);
    setFormData({
      name: '',
      mobileNumber: '',
      relation: '',
      address: ''
    });
  };

  // Handle delete contact
  const handleDeleteContact = (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(deleteContact(contactId))
        .then(() => {
          // After successful deletion, update the local state
          setContacts(contacts.filter(c => c._id !== contactId));
          setFilteredContacts(filteredContacts.filter(c => c._id !== contactId));
        })
        .catch(error => {
          console.error('Error deleting contact:', error);
        });
    }
  };

  // Handle input changes for form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingContact) {
      // Update existing contact
      dispatch(updateContact({
        contactId: editingContact._id,
        name: formData.name,
      mobileNumber: formData.mobileNumber,
      relation: formData.relation,
      address: formData.address
      }))
        .then(() => {
          // Reset form and editing state
          setFormData({
            name: '',
            mobileNumber: '',
            relation: '',
            address: ''
          });
          setEditingContact(null);
          // Refetch contacts to update the list
          dispatch(getContacts());
        })
        .catch(error => {
          console.error('Error updating contact:', error);
        });
    } else {
      // Add new contact
      dispatch(addContact(formData))
        .then(() => {
          // Reset form
          setFormData({
            name: '',
            mobileNumber: '',
            relation: '',
            address: ''
          });
          // Refetch contacts to update the list
          dispatch(getContacts());
        })
        .catch(error => {
          console.error('Error adding contact:', error);
        });
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">Add Contacts</h1>
        <p className="text-center text-gray-600 mt-2">Manage your contacts and send invitations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left side - Added Contacts */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-6 h-6 text-orange-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-800">Added Contacts</h2>
              </div>
              <span className="bg-orange-600 text-white text-sm font-medium rounded-full px-3 py-1">
                {filteredContacts.length} of {contacts.length}
              </span>
            </div>

            <div className="mt-2 flex">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search contacts..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <div className="absolute left-3 top-2.5 text-gray-400">
                  <Search className="w-5 h-5" />
                </div>
                {searchQuery && (
                  <button
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                    onClick={() => {
                      setSearchQuery('');
                      setFilteredContacts(contacts);
                    }}
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-gray-400">
              {searchQuery ? (
                <>
                  <Search className="w-16 h-16 mb-4" />
                  <p className="text-center font-medium">No matches found</p>
                  <p className="text-center text-sm mt-1">Try a different search term</p>
                </>
              ) : (
                <>
                  <Users className="w-16 h-16 mb-4" />
                  <p className="text-center font-medium">No contacts added yet</p>
                  <p className="text-center text-sm mt-1">Add contacts using the form</p>
                </>
              )}
            </div>
          ) : (
            <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
              {filteredContacts.map((contact) => (
                <div key={contact._id} className="border-b border-gray-100 last:border-0">
                  <div
                    className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => toggleContactDetails(contact._id)}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-medium flex-shrink-0">
                          {contact.name.split(' ').map(name => name[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <p className="font-semibold text-gray-800">{contact.name}</p>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                            {contact.mobileNumber}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full flex-shrink-0
                          ${contact.relation === 'Friend' ? 'bg-green-100 text-green-800' : ''}
                          ${contact.relation === 'Family' ? 'bg-orange-100 text-orange-800' : ''}
                          ${contact.relation === 'Relative' ? 'bg-amber-100 text-amber-800' : ''}
                          ${contact.relation === 'Other' ? 'bg-gray-100 text-gray-800' : ''}
                        `}>
                          {contact.relation}
                        </span>

                        {/* Edit Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditContact(contact);
                          }}
                          className="p-1 text-gray-500 hover:text-orange-600 transition-colors rounded-full hover:bg-orange-50"
                          title="Edit Contact"
                        >
                          <Edit size={16} />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteContact(contact._id);
                          }}
                          className="p-1 text-gray-500 hover:text-red-600 transition-colors rounded-full hover:bg-red-50"
                          title="Delete Contact"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Expanded Contact Details */}
                    {expandedContact === contact._id && (
                      <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600">
                        {contact.address && (
                          <div className="flex items-start">
                            <MapPin className="w-4 h-4 mr-2 mt-0.5 text-orange-500" />
                            <span>{contact.address}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="p-4 bg-gray-50 border-t border-gray-100 text-sm text-gray-500 flex justify-between items-center">
            <span>
              {searchQuery && filteredContacts.length !== contacts.length
                ? `${filteredContacts.length} of ${contacts.length} contacts`
                : `${contacts.length} contact${contacts.length !== 1 ? 's' : ''}`
              }
            </span>
            {contacts.length > 0 && (
              <button className="text-orange-600 hover:text-orange-800 font-medium flex items-center">
                <Upload className="w-4 h-4 mr-1" />
                Export
              </button>
            )}
          </div>
        </div>

        {/* Right side - Add/Edit Contact Form */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-amber-50">
            <div className="flex items-center">
              {editingContact ? (
                <>
                  <Edit className="w-6 h-6 text-orange-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">Edit Contact</h2>
                </>
              ) : (
                <>
                  <Plus className="w-6 h-6 text-orange-600 mr-2" />
                  <h2 className="text-xl font-bold text-gray-800">Add Contact</h2>
                </>
              )}
            </div>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter address"
                  ></textarea>
                </div>
              </div>

              <div>
                <label htmlFor="relation" className="block text-sm font-medium text-gray-700 mb-1">Relation</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="w-5 h-5 text-gray-400" />
                  </div>
                  <select
                    id="relation"
                    name="relation"
                    value={formData.relation}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white appearance-none"
                    required
                  >
                    <option value="" disabled>Select relation</option>
                    {relationOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                {editingContact && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-300 font-medium transition-all flex items-center justify-center"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Cancel
                  </button>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-amber-600 text-white py-3 px-4 rounded-lg hover:from-orange-700 hover:to-amber-700 focus:ring-4 focus:ring-orange-300 font-medium transition-all flex items-center justify-center"
                >
                  {editingContact ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Update Contact
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5 mr-2" />
                      Add Contact
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg text-sm text-orange-800 border border-orange-100">
              <div className="flex">
                <Info className="w-5 h-5 mr-2 flex-shrink-0" />
                <div>
                  <p className="font-medium">Contact Information</p>
                  <p className="mt-1">Added contacts will be visible in the list and available for sending invitations.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddContact;