pragma solidity ^0.5.8;

contract Doctor {
    // Store patient accounts
    mapping(string => Patient) public patients;
    uint public patientCount;

    mapping(uint => Prescription) public prescriptions;
    uint public prescriptionCount;
    uint public prescriptionID;
    string public healthCard;

    struct Patient {
        uint id;
        string firstName;
        string lastName;
        string healthCardNumber;
        uint prescId;
        string insuranceNm;
    }

    struct Prescription {
        uint id;
        string patientHealthCardNumber;
        string drugName;
        string frequency;
        string dosage;
        bool patientReceived;
    }

    // Constructor
    constructor () public {
        // read from json file
        // create patients
        addPatient("Pavani", "Machha", "123456789", "RBC Insurance");
        addPrescription("123456789", "Advil", "Daily", "10 ml");
        addPatient("Nhi", "Vuong", "1234-567-890", "DesJardins");
        addPrescription("1234-567-890", "Caffeine", "Every 2 hours", "1 tablet");
    }

    function addPatient(string memory _fname, string memory _lname, string memory _healthCard, string memory _InsuranceNm) public {
        patientCount++;
        patients[_healthCard] = Patient(patientCount, _fname, _lname, _healthCard, 0, _InsuranceNm);
    }

    function addPrescription(string memory _healthCard, string memory _drugName,string memory _frequency,string memory _dosage)public
    {
        prescriptionCount ++;
        prescriptions[prescriptionCount] = Prescription(prescriptionCount,_healthCard,_drugName,_frequency,_dosage,false);
        patients[_healthCard].prescId = prescriptionCount;
    }

    function fulfill(uint presid) public
    {
        prescriptions[presid].patientReceived = true;
    }
}
