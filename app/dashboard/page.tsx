"use client";

import { useState, useRef, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { v4 as uuidv4 } from "uuid";

// Make react-grid-layout responsive
const ResponsiveGridLayout = WidthProvider(Responsive);

interface Card {
  id: string;
  type: string;
  title: string;
  content: string;
  w: number;
  h: number;
  minW: number;
  minH: number;
  maxW: number;
  maxH: number;
}

const initialCards: Card[] = [
  {
    id: "card1",
    type: "text",
    title: "Text Card",
    content: "This is a text card with some sample content.",
    w: 3,
    h: 2,
    minW: 2,
    minH: 2,
    maxW: 6,
    maxH: 4,
  },
  {
    id: "card2",
    type: "chart",
    title: "Chart Card",
    content: "This card could contain a chart or graph.",
    w: 4,
    h: 3,
    minW: 3,
    minH: 2,
    maxW: 8,
    maxH: 5,
  },
  {
    id: "card3",
    type: "image",
    title: "Image Card",
    content: "This card could display an image.",
    w: 3,
    h: 3,
    minW: 2,
    minH: 2,
    maxW: 6,
    maxH: 4,
  },
];

export default function Dashboard() {
  const [gridItems, setGridItems] = useState<Card[]>([]);
  const [availableCards, setAvailableCards] = useState<Card[]>(initialCards);
  const [layouts, setLayouts] = useState({});
  const [maxDimensions, setMaxDimensions] = useState({ maxW: 12, maxH: 8 });
  const [isCardListOpen, setIsCardListOpen] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardListRef = useRef<HTMLDivElement>(null);

  // Calculate maximum size based on screen dimensions
  const calculateMaxDimensions = () => {
    if (typeof window === "undefined") return { maxW: 12, maxH: 8 };
    const gridWidth = window.innerWidth * 0.7; // Grid takes 70% of screen width
    const gridHeight = window.innerHeight - 150; // Account for header/footer
    const colWidth = gridWidth / 12; // Assuming 12 columns
    const rowHeight = 50; // Fixed row height
    return {
      maxW: Math.floor(gridWidth / colWidth),
      maxH: Math.floor(gridHeight / rowHeight),
    };
  };

  // Update max dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setMaxDimensions(calculateMaxDimensions());
    };

    handleResize(); // Initial calculation
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle drag start from card list
  const handleDragStartFromList = (card: Card, e: React.DragEvent) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ ...card, source: "list" })
    );
  };

  // Handle drag start from grid
  const handleDragStartFromGrid = (card: Card, e: React.DragEvent) => {
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ ...card, source: "grid" })
    );
  };

  // Handle drop on grid
  const handleDropOnGrid = (e: React.DragEvent) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (data.source !== "list") return; // Only handle drops from card list

    const newCard = {
      ...data,
      id: uuidv4(), // Generate new ID to avoid conflicts
      x: 0,
      y: 0,
    };

    // Apply screen size constraints
    newCard.maxW = Math.min(newCard.maxW, maxDimensions.maxW);
    newCard.maxH = Math.min(newCard.maxH, maxDimensions.maxH);

    // Add to grid and remove from available cards
    setGridItems([...gridItems, newCard]);
    setAvailableCards(availableCards.filter((card) => card.id !== data.id));
  };

  // Handle drop on card list
  const handleDropOnCardList = (e: React.DragEvent) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (data.source !== "grid") return; // Only handle drops from grid

    // Add back to available cards and remove from grid
    setAvailableCards([...availableCards, { ...data, id: data.id }]);
    setGridItems(gridItems.filter((item) => item.id !== data.id));
  };

  // Handle layout change
  const onLayoutChange = (layout: any) => {
    setLayouts({ lg: layout });
  };

  // Handle resize
  const onResizeStop = (layout: any, oldItem: any, newItem: any) => {
    const updatedItems = gridItems.map((item) => {
      if (item.id === newItem.i) {
        return {
          ...item,
          w: Math.min(newItem.w, maxDimensions.maxW),
          h: Math.min(newItem.h, maxDimensions.maxH),
        };
      }
      return item;
    });
    setGridItems(updatedItems);
  };

  // Allow drop on grid and card list
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Toggle card list visibility
  const toggleCardList = () => {
    setIsCardListOpen(!isCardListOpen);
  };

  // Render different card types
  const renderCard = (card: Card) => {
    return (
      <div
        className="bg-white p-4 rounded-lg shadow-md h-full flex flex-col"
        draggable
        onDragStart={(e) => handleDragStartFromGrid(card, e)}
      >
        <h3 className="font-bold text-lg mb-2">{card.title}</h3>
        <p>{card.content}</p>
        {card.type === "chart" && (
          <div className="mt-2 bg-gray-100 h-24 flex items-center justify-center">
            Chart Placeholder
          </div>
        )}
        {card.type === "image" && (
          <div className="mt-2 bg-gray-100 h-24 flex items-center justify-center">
            Image Placeholder
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Navigation Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4">
          <h2 className="text-xl font-bold">Navigation</h2>
        </div>
        <nav className="flex-1">
          <ul className="space-y-2 p-4">
            <li>
              <a
                href="/dashboard"
                className="block p-2 rounded hover:bg-gray-700"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/analytics"
                className="block p-2 rounded hover:bg-gray-700"
              >
                Analytics
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="block p-2 rounded hover:bg-gray-700"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
        <button
          onClick={toggleCardList}
          className="m-4 p-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          {isCardListOpen ? "Close Editor" : "Edit Dashboard"}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Welcome, User!</h1>
          <div className="flex items-center space-x-4">
            <div className="text-gray-600">John Doe</div>
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              JD
            </div>
          </div>
        </header>

        {/* Grid Area */}
        <div
          className="flex-1 p-4 overflow-auto"
          onDrop={handleDropOnGrid}
          onDragOver={handleDragOver}
          ref={gridRef}
        >
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={50}
            isDroppable
            onLayoutChange={onLayoutChange}
            onResizeStop={onResizeStop}
            isResizable
            isDraggable
          >
            {gridItems.map((item) => (
              <div
                key={item.id}
                data-grid={{
                  i: item.id,
                  x: item.x || 0,
                  y: item.y || 0,
                  w: item.w,
                  h: item.h,
                  minW: item.minW,
                  minH: item.minH,
                  maxW: Math.min(item.maxW, maxDimensions.maxW),
                  maxH: Math.min(item.maxH, maxDimensions.maxH),
                }}
              >
                {renderCard(item)}
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
      </div>

      {/* Card List (Slides in from right) */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white p-4 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isCardListOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onDrop={handleDropOnCardList}
        onDragOver={handleDragOver}
        ref={cardListRef}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Available Cards</h2>
          <button
            onClick={toggleCardList}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
        <div className="overflow-y-auto h-[calc(100%-4rem)]">
          {availableCards.length === 0 && (
            <p className="text-gray-600">No cards available</p>
          )}
          {availableCards.map((card) => (
            <div
              key={card.id}
              draggable
              onDragStart={(e) => handleDragStartFromList(card, e)}
              className="mb-4 p-4 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100"
            >
              <h3 className="font-semibold">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
