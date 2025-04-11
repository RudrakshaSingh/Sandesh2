import * as fabric from 'fabric';// You'll need to install this: npm install fabric
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Layout from '../Components/Layout/Layout';

const CreateCard = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('birthday');
  const [savedDesigns, setSavedDesigns] = useState([]);

  const { user, success } = useSelector((state) => state.userAuth);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    if (!success || !user) {
      navigate('/users/login');
    }
  }, [success, user, navigate]);

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current && !canvas) {
      const fabricCanvas = new fabric.Canvas(canvasRef.current, {
        width: 800,
        height: 600,
        backgroundColor: '#ffffff'
      });

      setCanvas(fabricCanvas);

      // Load template based on selection
      loadTemplate(fabricCanvas, selectedTemplate);

      // Cleanup
      return () => {
        fabricCanvas.dispose();
      };
    }
  }, [canvasRef]);

  // Load template when selection changes
  useEffect(() => {
    if (canvas) {
      loadTemplate(canvas, selectedTemplate);
    }
  }, [selectedTemplate, canvas]);

  // Function to load a template
  const loadTemplate = (canvas, templateType) => {
    // Clear canvas
    canvas.clear();
    canvas.backgroundColor = '#ffffff';

    // Add background based on template type
    const bgColors = {
      'birthday': '#FFECB3',
      'wedding': '#E8F5E9',
      'baby-shower': '#E1F5FE',
      'graduation': '#EDE7F6',
      'other': '#FFFFFF'
    };

    canvas.backgroundColor = bgColors[templateType] || bgColors.other;

    // Add template elements
    if (templateType === 'birthday') {
      // Add birthday elements
      addBirthdayTemplate(canvas);
    } else if (templateType === 'wedding') {
      // Add wedding elements
      addWeddingTemplate(canvas);
    } else {
      // Default template
      addDefaultTemplate(canvas);
    }

    canvas.renderAll();
  };

  // Template content functions
  const addBirthdayTemplate = (canvas) => {
    // Add title
    const title = new fabric.Text('Birthday Celebration!', {
      left: 400,
      top: 100,
      fontFamily: 'Arial',
      fontSize: 40,
      fill: '#D81B60',
      fontWeight: 'bold',
      originX: 'center',
      originY: 'center'
    });

    // Add details text
    const details = new fabric.Text('Join us to celebrate\nSaturday, June 15th, 2025\n7:00 PM\n123 Celebration Lane', {
      left: 400,
      top: 300,
      fontFamily: 'Arial',
      fontSize: 24,
      fill: '#333333',
      textAlign: 'center',
      lineHeight: 1.3,
      originX: 'center',
      originY: 'center'
    });

    // Add decorative elements
    for (let i = 0; i < 5; i++) {
      const circle = new fabric.Circle({
        radius: 15 + Math.random() * 30,
        fill: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`,
        left: Math.random() * 800,
        top: Math.random() * 600,
        originX: 'center',
        originY: 'center'
      });
      canvas.add(circle);
    }

    canvas.add(title);
    canvas.add(details);
  };

  const addWeddingTemplate = (canvas) => {
    // Add title
    const title = new fabric.Text('We\'re Getting Married', {
      left: 400,
      top: 100,
      fontFamily: 'Times New Roman',
      fontSize: 38,
      fill: '#4E342E',
      fontWeight: 'bold',
      originX: 'center',
      originY: 'center'
    });

    // Add names
    const names = new fabric.Text('Jane & John', {
      left: 400,
      top: 180,
      fontFamily: 'Dancing Script',
      fontSize: 48,
      fill: '#795548',
      originX: 'center',
      originY: 'center'
    });

    // Add details
    const details = new fabric.Text('Saturday, September 20th, 2025\n4:00 PM\nGarden Venue\n123 Wedding Lane, City', {
      left: 400,
      top: 300,
      fontFamily: 'Times New Roman',
      fontSize: 24,
      fill: '#5D4037',
      textAlign: 'center',
      lineHeight: 1.3,
      originX: 'center',
      originY: 'center'
    });

    // Add decorative elements
    const rect = new fabric.Rect({
      left: 400,
      top: 450,
      width: 350,
      height: 1,
      fill: '#A1887F',
      originX: 'center',
      originY: 'center'
    });

    canvas.add(title);
    canvas.add(names);
    canvas.add(details);
    canvas.add(rect);
  };

  const addDefaultTemplate = (canvas) => {
    // Add title
    const title = new fabric.Text('Invitation', {
      left: 400,
      top: 100,
      fontFamily: 'Arial',
      fontSize: 40,
      fill: '#333333',
      fontWeight: 'bold',
      originX: 'center',
      originY: 'center'
    });

    // Add details placeholder
    const details = new fabric.Text('Click to edit this text\nAdd event details here\nDate and Time\nLocation', {
      left: 400,
      top: 300,
      fontFamily: 'Arial',
      fontSize: 24,
      fill: '#555555',
      textAlign: 'center',
      lineHeight: 1.3,
      originX: 'center',
      originY: 'center'
    });

    canvas.add(title);
    canvas.add(details);
  };

  // Function to handle template selection
  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
  };

  // Function to add text
  const addText = () => {
    if (canvas) {
      const text = new fabric.Textbox('Click to edit', {
        left: 400,
        top: 400,
        fontFamily: 'Arial',
        fontSize: 20,
        fill: '#333333',
        width: 200,
        originX: 'center',
        originY: 'center',
        textAlign: 'center'
      });

      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    }
  };

  // Function to add shape
  const addShape = (shapeType) => {
    if (!canvas) return;

    let shape;
    if (shapeType === 'circle') {
      shape = new fabric.Circle({
        radius: 50,
        fill: 'rgba(255, 0, 0, 0.5)',
        left: 400,
        top: 300,
        originX: 'center',
        originY: 'center'
      });
    } else if (shapeType === 'rectangle') {
      shape = new fabric.Rect({
        width: 100,
        height: 100,
        fill: 'rgba(0, 0, 255, 0.5)',
        left: 400,
        top: 300,
        originX: 'center',
        originY: 'center'
      });
    }

    if (shape) {
      canvas.add(shape);
      canvas.setActiveObject(shape);
      canvas.renderAll();
    }
  };

  // Function to save design
  const saveDesign = () => {
    if (canvas) {
      // Convert to JSON
      const designJSON = canvas.toJSON();
      // Get a data URL
      const designImage = canvas.toDataURL({
        format: 'png',
        quality: 0.8
      });

      // Create a new design object
      const newDesign = {
        id: Date.now().toString(),
        name: `${selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)} Invitation`,
        type: selectedTemplate,
        json: designJSON,
        image: designImage,
        createdAt: new Date().toISOString()
      };

      // Add to saved designs
      setSavedDesigns([...savedDesigns, newDesign]);

      // Here you would typically save to your backend
      console.log('Design saved:', newDesign);

      alert('Design saved successfully!');
    }
  };

  // Function to load a saved design
  const loadDesign = (design) => {
    if (canvas && design.json) {
      canvas.loadFromJSON(design.json, () => {
        canvas.renderAll();
        setSelectedTemplate(design.type);
      });
    }
  };

  // Delete a design
  const deleteDesign = (designId) => {
    setSavedDesigns(savedDesigns.filter(design => design.id !== designId));
  };

  return (
    <Layout>
      <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Invitation</h1>
          <p className="mt-2 text-lg text-gray-600">
            Design beautiful custom invitations for any occasion.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="p-6 bg-amber-50 border-b border-amber-200">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Design Your Invitation</h2>
                <p className="text-gray-600 mt-1">Choose a template and customize to your liking</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <select
                  value={selectedTemplate}
                  onChange={handleTemplateChange}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="birthday">Birthday</option>
                  <option value="wedding">Wedding</option>
                  <option value="baby-shower">Baby Shower</option>
                  <option value="graduation">Graduation</option>
                  <option value="other">Other</option>
                </select>

                <button
                  onClick={addText}
                  className="px-3 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Add Text
                </button>

                <button
                  onClick={() => addShape('circle')}
                  className="px-3 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Add Circle
                </button>

                <button
                  onClick={() => addShape('rectangle')}
                  className="px-3 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Add Rectangle
                </button>

                <button
                  onClick={saveDesign}
                  className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                >
                  Save Design
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 overflow-auto bg-gray-100">
            <div className="mx-auto" style={{ width: 800, height: 600 }}>
              <canvas ref={canvasRef} id="invitation-canvas" />
            </div>
          </div>

          <div className="p-4 bg-amber-50 border-t border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>Tip:</strong> Click on any element to select it. Use the controls to resize or rotate.
              Double-click text to edit. Drag elements to reposition them.
            </p>
          </div>
        </div>

        {savedDesigns.length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">My Saved Designs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {savedDesigns.map((design) => (
                <div key={design.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <img
                      src={design.image}
                      alt={design.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-800">{design.name}</h3>
                    <p className="text-sm text-gray-500">{new Date(design.createdAt).toLocaleDateString()}</p>
                    <div className="mt-3 flex justify-between">
                      <button
                        onClick={() => loadDesign(design)}
                        className="text-amber-600 hover:text-amber-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteDesign(design.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">How to Use</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Select a template from the dropdown menu</li>
              <li>Add text and shapes using the buttons provided</li>
              <li>Click on elements to select them for editing</li>
              <li>Double-click text elements to edit the content</li>
              <li>Drag elements to reposition them on the canvas</li>
              <li>Click "Save Design" when you're happy with your invitation</li>
            </ol>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tips for Great Invitations</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Keep your design clean and easy to read</li>
              <li>Include all essential details: who, what, when, where</li>
              <li>Use colors that match your event theme</li>
              <li>Add personal touches to make it special</li>
              <li>Double-check all information before sending</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCard;