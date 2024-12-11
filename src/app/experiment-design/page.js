"use client";

import { useState, useEffect } from "react";
import { drawLine, drawArc, handleSegmentClick } from "./segmentUtils"; // Import the utility functions

export default function ExperimentDesign() {
  const [linesData, setLinesData] = useState([]);
  const [arcsData, setArcsData] = useState([]);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [alreadyVisited, setAlreadyVisited] = useState(new Set()); // Tracks visited segments

  // Size and scaling constants
  const box_size = 800;
  const prop = box_size / 6.5;
  const offset = box_size / 2;

  // Offset parameters to move the entire SVG
  const xOffset = 0; // Adjust this value to move elements left/right
  const yOffset = 200; // Adjust this value to move elements up/down

  // Fetch the JSON data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const linesResponse = await fetch("new_lines.json"); // Assuming lines are still in this file
        const arcsResponse = await fetch("Processed_Arcs.json"); // Fetch from the new arcs JSON
        const lines = await linesResponse.json();
        const arcs = await arcsResponse.json();
        setLinesData(lines);
        setArcsData(arcs);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Find a valid path using BFS
  const findPath = (start, end) => {
    const queue = [[start]];
    const visited = new Set(alreadyVisited);

    while (queue.length > 0) {
      const path = queue.shift();
      const node = path[path.length - 1];

      if (node === end) {
        return path;
      }

      // Get connected segments from `nodesPathsData`
      const connectedSegments = []; // Add your logic to get connected segments for `node`

      connectedSegments.forEach((nextSegment) => {
        if (!visited.has(nextSegment)) {
          visited.add(nextSegment);
          queue.push([...path, nextSegment]);
        }
      });
    }
    return null;
  };

  return (
    <div>
      <h1>Wow this is not fun to debug</h1>
      <div className="center ps-40">
        <svg
          width={box_size}
          height={box_size}
          className="border-black border-2"
        >
          {/* Render all lines */}
          {linesData.map((line) =>
            drawLine(line, prop, offset, xOffset, yOffset, (id) =>
              handleSegmentClick(
                id,
                alreadyVisited,
                selectedSegments,
                setSelectedSegments,
                setAlreadyVisited,
                findPath
              )
            )
          )}
          {/* Render all arcs */}
          {arcsData.map((arc) =>
            drawArc(arc, prop, offset, xOffset, yOffset, (id) =>
              handleSegmentClick(
                id,
                alreadyVisited,
                selectedSegments,
                setSelectedSegments,
                setAlreadyVisited,
                findPath
              )
            )
          )}
        </svg>
      </div>
    </div>
  );
}
