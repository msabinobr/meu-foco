# FocusFlow: Your ADHD Companion App

## Overview

FocusFlow is a React-based application designed to assist individuals, particularly those with ADHD, in managing organization, focus, and well-being. It integrates an AI personal assistant to provide comprehensive support.

## Features

FocusFlow offers a comprehensive suite of tools to aid in daily life:

*   **Dashboard:** Your central hub for a quick overview of tasks, stats, and motivational messages.
*   **Breathing Game:** Guided breathing exercises with animations, sounds, and progress tracking to help you recenter and relax.
*   **Magic Pomodoro:** A customizable Pomodoro timer to enhance focus, with task association and session statistics.
*   **Mission Board (Tasks):** A robust task management system allowing you to add, edit, filter, and track your to-dos.
*   **How I Am (Well-being Tracker):** A simple interface to log and monitor your daily mood and well-being.
*   **Magic Diary:** A private space for journaling, with potential for tagging and categorization.
*   **AI Assistant:** An interactive chat interface with a virtual assistant providing suggestions, answering questions, and helping with organization.
*   **Enchanted Journey (Progress Tracker):** Visualize your overall progress within the app as an engaging "journey," possibly with achievements and levels.

## Key Components & Code Structure

The application is built with React and organized into several key components:

*   **`Layout.js`:** This is the main layout component, responsible for the overall page structure, including the navigation sidebar, header, and footer. It also manages user state, data loading, and sidebar interactions (expanded/collapsed).
*   **`BreathingGamePage.js`:** Implements the interactive breathing game. This component handles the timer, animations, binaural sounds, selection of breathing techniques, session statistics, and history.
*   **`InteractiveAgent.js`:** Powers the AI assistant. It includes the chat interface, smart suggestions, text/voice input capabilities, and message history.

## Technologies Used

The application leverages a modern web development stack:

*   **React:** The core library for building the user interface.
*   **react-router-dom:** For handling navigation and routing between different pages/sections.
*   **lucide-react:** Used for incorporating a library of vector icons.
*   **Custom UI Components:** Likely from the application's own library or a framework like Tailwind UI, including:
    *   `Card`, `CardContent`, `CardHeader`, `CardTitle`
    *   `Button`, `Badge`, `Select`, `Tabs`, `Input`, `Progress`
    *   `Sidebar`, `SidebarContent`, `SidebarGroup`
*   **recharts:** A library for creating charts and data visualizations (e.g., for breathing game progress).
*   **date-fns:** A utility library for manipulating and formatting dates.

## General Flow and Main Functionalities

The application is designed for intuitive interaction:

*   **Main Layout & Navigation:** The `Layout.js` component provides a consistent structure with a sidebar for easy navigation between the app's different sections using `react-router-dom`. User-specific information like avatar, level, and points is also displayed within this layout.
*   **Breathing Game:** Users can access the `BreathingGamePage` to select various breathing techniques, start timed sessions, follow visual animations, and listen to binaural sounds. Session statistics are recorded for progress tracking.
*   **AI Assistant:** The `InteractiveAgent` component offers a chat interface for users to communicate with the AI assistant via text or voice. The assistant provides suggestions and responses to help with organization and other tasks.
*   **User Data Management:** The application handles user-specific data, including profile information, progress in activities, various statistics, and achievements, managed via a `User` entity.
*   **UI Components:** A rich set of custom and library-based UI components are used throughout the application to create a visually appealing and interactive experience.
