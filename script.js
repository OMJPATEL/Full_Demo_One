window.addEventListener("DOMContentLoaded", async () => {
  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  const container = document.getElementById("employee-list");

  try {
    const res = await fetch("employees.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    // Render departments & names alphabetically
    Object.keys(data)
      .sort((a, b) => a.localeCompare(b))
      .forEach(dept => {
        const section = document.createElement("section");
        section.classList.add("department");

        const heading = document.createElement("h4");
        heading.textContent = dept;
        section.appendChild(heading);

        const ul = document.createElement("ul");
        data[dept]
          .slice()
          .sort((a, b) => a.localeCompare(b))
          .forEach(name => {
            const li = document.createElement("li");
            li.textContent = name;
            ul.appendChild(li);
          });

        section.appendChild(ul);
        container.appendChild(section);
      });
  } catch (err) {
    container.innerHTML = `<p role="alert">Could not load employees. ${String(err)}</p>`;
    console.error(err);
  }
});
