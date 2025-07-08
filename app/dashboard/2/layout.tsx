"use client";

import React, { useState, useEffect } from "react";
import { Header, Sidebar, CardVarietyList } from "@/src/components/common";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  StateCard,
  EventCard,
  ReminderCard,
  NotificationCard,
  EmployeesLeaveCard,
} from "@/src/components/cards";

interface DashboardCard {
  id: string;
  component: string;
  layout: Layout;
}

function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isCardListOpen, setIsCardListOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [cards, setCards] = useState<DashboardCard[]>([]);

  // Load saved layout from localStorage on mount
  useEffect(() => {
    const savedLayout = localStorage.getItem("dashboardLayout");
    if (savedLayout) {
      console.log("Loaded layout from localStorage:", JSON.parse(savedLayout));
      setCards(JSON.parse(savedLayout));
    }
  }, []);

  // Toggle card list and editing mode
  const handleToggleCardList = () => {
    setIsCardListOpen((prev) => !prev);
    setIsEditing(true);
  };

  // Save layout to localStorage
  const handleSaveLayout = () => {
    console.log("Saving layout to localStorage:", cards);
    localStorage.setItem("dashboardLayout", JSON.stringify(cards));
    setIsEditing(false);
    setIsCardListOpen(false);
  };

  // Handle dropping a card onto the canvas
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const cardType = e.dataTransfer.getData("text/plain");
    console.log("Dropped card type:", cardType);
    if (!cardType) return;

    const newCard: DashboardCard = {
      id: `${cardType}-${Date.now()}`,
      component: cardType,
      layout: {
        i: `${cardType}-${Date.now()}`,
        x: Math.floor(e.clientX / 100) % 12, // Approximate grid position
        y: Math.floor(e.clientY / 30), // Approximate grid position
        w: 4,
        h: 4,
      },
    };
    console.log("Adding new card:", newCard);
    setCards((prev) => [...prev, newCard]);
  };

  // Handle layout changes
  const handleLayoutChange = (newLayout: Layout[]) => {
    console.log("Layout changed:", newLayout);
    setCards((prev) =>
      prev.map((card) => ({
        ...card,
        layout: newLayout.find((l) => l.i === card.id) || card.layout,
      }))
    );
  };

  // Render card component based on type
  const renderCard = (card: DashboardCard) => {
    console.log("Rendering card:", card);
    switch (card.component) {
      case "StateCard":
        return <StateCard />;
      case "EventCard":
        return <EventCard />;
      case "ReminderCard":
        return <ReminderCard />;
      case "NotificationCard":
        return <NotificationCard />;
      case "EmployeesLeaveCard":
        return <EmployeesLeaveCard />;
      default:
        return <div>Unknown Card Type</div>;
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden">
      <Sidebar
        isCardListOpen={isCardListOpen}
        onToggleCardList={handleToggleCardList}
        isEditing={isEditing}
        onSaveLayout={handleSaveLayout}
      />

      <div className="flex-1 flex flex-col">
        <Header />

        <main
          className="flex-1 h-[calc(100vh-74px)] overflow-hidden overflow-y-auto"
          onDragOver={(e) => e.preventDefault()}
          onDrop={isEditing ? handleDrop : undefined}
        >
          <div className="relative w-full h-full">
            <GridLayout
              className="layout"
              layout={cards.map((card) => card.layout)}
              cols={12}
              rowHeight={30}
              width={1200}
              isDraggable={isEditing}
              isResizable={isEditing}
              onLayoutChange={handleLayoutChange}
              style={{ minHeight: "100%" }}
            >
              {cards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white border border-gray-200 rounded-md shadow-sm p-4"
                  style={{ overflow: "hidden" }}
                >
                  {renderCard(card)}
                </div>
              ))}
            </GridLayout>
          </div>
        </main>
      </div>

      <CardVarietyList isOpen={isCardListOpen} setIsOpen={setIsCardListOpen} />
    </div>
  );
}

export default DashboardLayout;
