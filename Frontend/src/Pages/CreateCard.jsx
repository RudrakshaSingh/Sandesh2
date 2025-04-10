import { Circle, Download, Image, Plus, Square, Trash2,Type } from 'lucide-react';
import React, { useEffect,useRef, useState } from 'react';

const CreateCard = () => {
  // Main states
  const [bgColor, setBgColor] = useState('#ffffff');
  const [elements, setElements] = useState([]);
  const [selectedElementId, setSelectedElementId] = useState(null);

  // Text options
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(24);
  const [fontFamily, setFontFamily] = useState('Arial');

  // Refs
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Draw canvas whenever elements or background change
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    elements.forEach(elem => {
      if (elem.type === 'text') {
        drawText(ctx, elem);
      } else if (elem.type === 'rectangle') {
        drawRectangle(ctx, elem);
      } else if (elem.type === 'circle') {
        drawCircle(ctx, elem);
      } else if (elem.type === 'image') {
        drawImage(ctx, elem);
      }

      // Draw selection outline if selected
      if (elem.id === selectedElementId) {
        drawSelectionOutline(ctx, elem);
      }
    });
  }, [elements, bgColor, selectedElementId]);

  // Drawing functions
  const drawText = (ctx, elem) => {
    ctx.font = `${elem.fontSize}px ${elem.fontFamily}`;
    ctx.fillStyle = elem.color;
    ctx.fillText(elem.text, elem.x, elem.y);
  };

  const drawRectangle = (ctx, elem) => {
    ctx.fillStyle = elem.color;
    ctx.globalAlpha = elem.opacity || 1;
    ctx.fillRect(elem.x, elem.y, elem.width, elem.height);
    ctx.globalAlpha = 1;
  };

  const drawCircle = (ctx, elem) => {
    ctx.beginPath();
    ctx.arc(elem.x + elem.radius, elem.y + elem.radius, elem.radius, 0, Math.PI * 2);
    ctx.fillStyle = elem.color;
    ctx.globalAlpha = elem.opacity || 1;
    ctx.fill();
    ctx.globalAlpha = 1;
  };

  const drawImage = (ctx, elem) => {
    if (elem.image) {
      ctx.drawImage(elem.image, elem.x, elem.y, elem.width, elem.height);
    }
  };

  const drawSelectionOutline = (ctx, elem) => {
    ctx.strokeStyle = '#2196F3';
    ctx.lineWidth = 2;

    if (elem.type === 'text') {
      const metrics = ctx.measureText(elem.text);
      const width = metrics.width;
      const height = elem.fontSize;
      ctx.strokeRect(elem.x - 2, elem.y - height - 2, width + 4, height + 4);
    } else if (elem.type === 'rectangle' || elem.type === 'image') {
      ctx.strokeRect(elem.x - 2, elem.y - 2, elem.width + 4, elem.height + 4);
    } else if (elem.type === 'circle') {
      ctx.strokeRect(
        elem.x - 2,
        elem.y - 2,
        elem.radius * 2 + 4,
        elem.radius * 2 + 4
      );
    }
  };

  // Element creation functions
  const addText = () => {
    const newId = Date.now().toString();
    const newElement = {
      id: newId,
      type: 'text',
      text: 'Your Text Here',
      x: 100,
      y: 150,
      fontSize: fontSize,
      fontFamily: fontFamily,
      color: textColor
    };

    setElements([...elements, newElement]);
    setSelectedElementId(newId);
  };

  const addRectangle = () => {
    const newId = Date.now().toString();
    const newElement = {
      id: newId,
      type: 'rectangle',
      x: 100,
      y: 100,
      width: 150,
      height: 100,
      color: '#3498db',
      opacity: 0.7
    };

    setElements([...elements, newElement]);
    setSelectedElementId(newId);
  };

  const addCircle = () => {
    const newId = Date.now().toString();
    const newElement = {
      id: newId,
      type: 'circle',
      x: 100,
      y: 100,
      radius: 50,
      color: '#e74c3c',
      opacity: 0.7
    };

    setElements([...elements, newElement]);
    setSelectedElementId(newId);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        // Scale the image if it's too big
        let width = img.width;
        let height = img.height;

        if (width > 400 || height > 300) {
          const scale = Math.min(400 / width, 300 / height);
          width *= scale;
          height *= scale;
        }

        const newId = Date.now().toString();
        const newElement = {
          id: newId,
          type: 'image',
          x: 100,
          y: 100,
          width: width,
          height: height,
          image: img
        };

        setElements([...elements, newElement]);
        setSelectedElementId(newId);
      };
    };

    reader.readAsDataURL(file);
    e.target.value = null; // Reset file input
  };

  // Handle clicks on canvas
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on an element (in reverse order to select top element first)
    let clickedElementId = null;

    for (let i = elements.length - 1; i >= 0; i--) {
      const elem = elements[i];

      if (isPointInElement(x, y, elem)) {
        clickedElementId = elem.id;
        break;
      }
    }

    setSelectedElementId(clickedElementId);
  };

  // Helper function to check if point is inside element
  const isPointInElement = (x, y, elem) => {
    if (elem.type === 'rectangle' || elem.type === 'image') {
      return (
        x >= elem.x &&
        x <= elem.x + elem.width &&
        y >= elem.y &&
        y <= elem.y + elem.height
      );
    } else if (elem.type === 'circle') {
      const dx = x - (elem.x + elem.radius);
      const dy = y - (elem.y + elem.radius);
      return dx * dx + dy * dy <= elem.radius * elem.radius;
    } else if (elem.type === 'text') {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.font = `${elem.fontSize}px ${elem.fontFamily}`;
      const metrics = ctx.measureText(elem.text);

      return (
        x >= elem.x &&
        x <= elem.x + metrics.width &&
        y >= elem.y - elem.fontSize &&
        y <= elem.y
      );
    }

    return false;
  };

  // Delete selected element
  const deleteSelected = () => {
    if (!selectedElementId) return;

    setElements(elements.filter(elem => elem.id !== selectedElementId));
    setSelectedElementId(null);
  };

  // Clear canvas
  const clearCanvas = () => {
    if (window.confirm('Are you sure you want to clear all elements?')) {
      setElements([]);
      setSelectedElementId(null);
    }
  };

  // Save as image
  const saveAsImage = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.download = 'event-card.png';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Template functions
  const loadBirthdayTemplate = () => {
    setBgColor('#f8e1e7');

    const newElements = [
      {
        id: '1',
        type: 'text',
        text: 'BIRTHDAY PARTY!',
        x: 150,
        y: 80,
        fontSize: 40,
        fontFamily: 'Impact',
        color: '#e84393'
      },
      {
        id: '2',
        type: 'text',
        text: "Join us to celebrate\nJohn's 30th Birthday",
        x: 180,
        y: 150,
        fontSize: 20,
        fontFamily: 'Arial',
        color: '#333333'
      },
      {
        id: '3',
        type: 'text',
        text: "Saturday, June 15, 2025\n7:00 PM\n123 Party Lane",
        x: 180,
        y: 210,
        fontSize: 18,
        fontFamily: 'Arial',
        color: '#333333'
      },
      {
        id: '4',
        type: 'circle',
        x: 50,
        y: 50,
        radius: 30,
        color: '#fd79a8',
        opacity: 0.7
      },
      {
        id: '5',
        type: 'circle',
        x: 500,
        y: 50,
        radius: 30,
        color: '#fd79a8',
        opacity: 0.7
      }
    ];

    setElements(newElements);
    setSelectedElementId(null);
  };

  const loadWeddingTemplate = () => {
    setBgColor('#f5f5f5');

    const newElements = [
      {
        id: '1',
        type: 'rectangle',
        x: 20,
        y: 20,
        width: 560,
        height: 360,
        color: 'transparent',
        borderColor: '#d4af37',
        borderWidth: 2
      },
      {
        id: '2',
        type: 'text',
        text: 'Together With Their Families',
        x: 150,
        y: 80,
        fontSize: 20,
        fontFamily: 'Times New Roman',
        color: '#666666'
      },
      {
        id: '3',
        type: 'text',
        text: 'Emma Smith\n&\nJames Johnson',
        x: 180,
        y: 160,
        fontSize: 30,
        fontFamily: 'Times New Roman',
        color: '#333333'
      },
      {
        id: '4',
        type: 'text',
        text: 'REQUEST THE PLEASURE OF YOUR COMPANY\nAT THEIR WEDDING\nSATURDAY, SEPTEMBER 5, 2025',
        x: 120,
        y: 270,
        fontSize: 14,
        fontFamily: 'Times New Roman',
        color: '#666666'
      }
    ];

    setElements(newElements);
    setSelectedElementId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Simple Event Card Designer
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Canvas */}
          <div className="md:col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                onClick={handleCanvasClick}
                className="border border-gray-300 rounded mx-auto"
              ></canvas>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Templates */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Templates</h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={loadBirthdayTemplate}
                  className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-md text-sm hover:bg-indigo-200"
                >
                  Birthday
                </button>
                <button
                  onClick={loadWeddingTemplate}
                  className="px-3 py-2 bg-indigo-100 text-indigo-700 rounded-md text-sm hover:bg-indigo-200"
                >
                  Wedding
                </button>
              </div>
            </div>

            {/* Add Elements */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Add Elements</h2>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={addText}
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md flex items-center justify-center"
                >
                  <Type size={18} className="mr-2" />
                  Text
                </button>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md flex items-center justify-center"
                >
                  <Image size={18} className="mr-2" />
                  Image
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
                <button
                  onClick={addRectangle}
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md flex items-center justify-center"
                >
                  <Square size={18} className="mr-2" />
                  Rectangle
                </button>
                <button
                  onClick={addCircle}
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-md flex items-center justify-center"
                >
                  <Circle size={18} className="mr-2" />
                  Circle
                </button>
              </div>
            </div>

            {/* Colors */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Colors</h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Background Color
                  </label>
                  <div className="flex items-center">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-300 mr-2"
                      style={{ backgroundColor: bgColor }}
                    ></div>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Text Color
                  </label>
                  <div className="flex items-center">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-300 mr-2"
                      style={{ backgroundColor: textColor }}
                    ></div>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font Size: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Font Family
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Impact">Impact</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={deleteSelected}
                  disabled={!selectedElementId}
                  className={`w-full px-4 py-2 rounded-md flex items-center justify-center ${
                    selectedElementId
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-red-200 text-red-400 cursor-not-allowed'
                  }`}
                >
                  <Trash2 size={18} className="mr-2" />
                  Delete Selected
                </button>
                <button
                  onClick={clearCanvas}
                  className="w-full px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 flex items-center justify-center"
                >
                  <Plus size={18} className="mr-2 rotate-45" />
                  Clear All
                </button>
                <button
                  onClick={saveAsImage}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
                >
                  <Download size={18} className="mr-2" />
                  Download Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCard;