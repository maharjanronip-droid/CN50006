
const fullName = "Ronip Maharjan";
const studentID = "3046834";
const labGroup = "09";
console.log("Student Name: " + fullName);
console.log("Student ID: " + studentID);
console.log("Lab Group: " + labGroup);
console.log("Current Date and Time: " + new Date().toLocaleString());
const favouriteLanguage = () => "JavaScript";
console.log("Favourite Programming Language: " + favouriteLanguage());
const digits = studentID.replace(/\D/g, "");
if (digits.length < 4) {
  console.log("Enter a student ID containing at least four digits.");
} else {
  const verificationNumber = digits.slice(-4).split("")
    .reduce((total, digit) => total + Number(digit), 0);
  console.log("Verification Number: " + verificationNumber);
}