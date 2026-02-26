import fs from "fs";

const folksContent = fs.readFileSync("./src/routes/folks.js", "utf-8");
const regex =
    /name:\s*["']([^"']+)["'],\s*page:\s*["']([^"']+)["'],\s*type:\s*["']([^"']+)["']/g;

let match;
const folks = [];
while ((match = regex.exec(folksContent)) !== null) {
    folks.push({
        name: match[1],
        page: match[2],
        type: match[3].charAt(0).toUpperCase() + match[3].slice(1),
    });
}

// Sort alphabetically by name
folks.sort((a, b) => a.name.localeCompare(b.name));

// Generate Markdown table
let table = "| Folk | Website | Field |\n| :--- | :--- | :--- |\n";
folks.forEach((f) => {
    table += `| ${f.name} | ${f.page} | ${f.type} |\n`;
});

// Update README.md
const readmePath = "./README.md";
let readmeContent = fs.readFileSync(readmePath, "utf-8");

const startMarker = "## List";
const endMarker = "## Contributions";

const startIndex = readmeContent.indexOf(startMarker);
const endIndex = readmeContent.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    // Find the end of the start marker line
    const tableStart = readmeContent.indexOf("\n", startIndex) + 1;
    // Find the start of the end marker line
    const tableEnd = readmeContent.lastIndexOf("\n", endIndex);

    const newReadme =
        readmeContent.substring(0, tableStart) +
        "\n" +
        table +
        "\n" +
        readmeContent.substring(tableEnd + 1);
    fs.writeFileSync(readmePath, newReadme);
    console.log(`README.md updated successfully with ${folks.length} folks!`);
} else {
    console.error("Could not find the markers in README.md");
}
