const generateTimeDate = () => {
    let date = new Date();
    let time = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
    date = date.toLocaleDateString();
    return `${date} at ${time}`;
};

const libraryRecords = [];

const submintButton = document.getElementById("submit-btn");
const form = document.querySelector(".library-form");
const bookName = form.elements[0];
const readerName = form.elements[1];
const tableBody = document.querySelector("#record-table tbody");

let currentId = 0;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newRecord = {
        id: ++currentId,
        book_name: bookName.value,
        issued_to: readerName.value,
        issued_time: generateTimeDate(),
        status: "Not Returned",
    };
    libraryRecords.push(newRecord);
});

generateTable = () => {
    libraryRecords.forEach((record) => {
        const row = tableBody.insertRow();
        const idCell = row.insertCell();
        const bookNameCell = row.insertCell();
        const readerNameCell = row.insertCell();
        const issuedTimeCell = row.insertCell();
        const statusCell = row.insertCell();

        const select = document.createElement("select");
        const options = ["", "Not Returned", "Returned"];

        options.forEach((option) => {
            const optionElement = document.createElement("option");
            optionElement.textContent = option;
            if (option !== "") {
                optionElement.value = option;
            }
            select.appendChild(optionElement);
            // if (select.value == "Not Returned") {
            //     select.style.color = "red";
            // } else {
            //     select.style.color = "green";
            // }
        });
        select.value = record.status;

        idCell.textContent = record.id;
        bookNameCell.textContent = record.book_name;
        readerNameCell.textContent = record.issued_to;
        issuedTimeCell.textContent = record.issued_time;
        statusCell.appendChild(select);
    });
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const children = tableBody.querySelectorAll("*");
    children.forEach((child) => {
        child.remove();
    });
    generateTable();
});
