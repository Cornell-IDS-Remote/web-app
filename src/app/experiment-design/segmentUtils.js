// Utility file to handle line and arc rendering and click handling

// Function to color a segment (either line or arc)
export const colorSegment = (id, color) => {
  const element = document.getElementById(id);
  if (element) {
    element.setAttribute("stroke", color);
    element.setAttribute("stroke-width", "4");
  }
};

// Function to color a path (series of segments)
export const colorPathSegments = (path) => {
  path.forEach((segment) => {
    colorSegment(segment, "red");
  });
};

// Handle clicking on a segment (either line or arc)
export const handleSegmentClick = (
  id,
  alreadyVisited,
  selectedSegments,
  setSelectedSegments,
  setAlreadyVisited,
  findPath
) => {
  console.log(`clicking on ${id}`);
  if (alreadyVisited.has(String(id))) {
    console.log(`Segment ${id} already visited, ignoring click.`);
    return;
  }

  if (selectedSegments.length > 0) {
    const lastSelected = String(selectedSegments[selectedSegments.length - 1]);

    // Find path between the last selected and newly clicked segment
    const path = findPath(lastSelected, String(id));

    if (path) {
      colorPathSegments(path); // Color the found path in red
      setSelectedSegments((prev) => [...prev, String(id)]);
      setAlreadyVisited((prev) => new Set([...prev, ...path]));
    } else {
      console.log(`No valid path found between ${lastSelected} and ${id}`);
    }
  } else {
    // If no previous segment is selected, select the first segment
    setSelectedSegments([String(id)]);
    setAlreadyVisited(new Set([String(id)]));
    colorSegment(String(id), "green"); // Turn the first segment green
  }
};

// Render the lines
export const drawLine = (
  line,
  prop,
  offset,
  xOffset,
  yOffset,
  handleSegmentClick
) => {
  const { id, direction, length, x, y } = line;

  let x2 = 0;
  let y2 = 0;

  if (direction.includes("+X")) {
    x2 = x - length;
    y2 = y;
  } else if (direction.includes("-X")) {
    x2 = x + length;
    y2 = y;
  } else if (direction.includes("+Y")) {
    x2 = x;
    y2 = y - length;
  } else if (direction.includes("-Y")) {
    x2 = x;
    y2 = y + length;
  }

  return (
    <line
      key={String(id)} // Ensure id is treated as a string
      id={String(id)} // Ensure id is treated as a string
      x1={-x * prop + offset + xOffset}
      y1={y * prop + offset + yOffset}
      x2={-x2 * prop + offset + xOffset}
      y2={y2 * prop + offset + yOffset}
      stroke="black" // Initially black
      strokeWidth="3"
      onClick={() => handleSegmentClick(id)} // Click handler
    />
  );
};

// Render the arcs
export const drawArc = (
  arc,
  prop,
  offset,
  xOffset,
  yOffset,
  handleSegmentClick
) => {
  const {
    id,
    radius,
    angleStart,
    angleEnd,
    rotation,
    starting_x,
    starting_y,
    ending_x,
    ending_y,
  } = arc;

  // Use the provided starting and ending points directly
  const scaledXStart = -starting_x * prop + offset + xOffset; // Apply xOffset
  const scaledYStart = starting_y * prop + offset + yOffset; // Apply yOffset
  const scaledXEnd = -ending_x * prop + offset + xOffset; // Apply xOffset
  const scaledYEnd = ending_y * prop + offset + yOffset; // Apply yOffset

  // Determine if the arc spans more than 180 degrees
  const largeArcFlag = Math.abs(angleEnd - angleStart) > Math.PI ? 1 : 0;

  // Sweep flag: 1 for clockwise, 0 for counterclockwise
  const sweepFlag = rotation === "CW" ? 1 : 0;

  // Construct the path 'd' string for the SVG <path> element
  const pathD = `
      M ${scaledXStart},${scaledYStart} 
      A ${radius * prop},${
    radius * prop
  } 0 ${largeArcFlag} ${sweepFlag} ${scaledXEnd},${scaledYEnd}
    `;

  // Render the arc as an SVG path element
  return (
    <path
      key={String(id)} // Ensure id is treated as a string
      id={String(id)} // Ensure id is treated as a string
      d={pathD}
      stroke="black" // Default stroke color
      strokeWidth="3"
      fill="transparent" // No fill for the arc
      onClick={() => handleSegmentClick(id)} // Handle click event
    />
  );
};
