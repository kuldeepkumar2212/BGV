// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract BGV {
    struct Document {
        string name;
        string hashValue;
    }

    struct Student {
        string name;
        Document[] documents;
    }

    struct University {
        string name;
        string licenseNumber;
        bool approvedByGovernment;
    }

    mapping(address => Student) public students;
    mapping(address => University) public universities;
    mapping(string => bool) public licenseNumbers;

    event StudentAdded(address indexed studentAddress, string name);
    event DocumentAdded(address indexed studentAddress, string documentName, string hashValue);
    event UniversityAdded(address indexed universityAddress, string name);
    event UniversityAlreadyExists(address indexed universityAddress, string message);

    modifier onlyStudent(address _studentAddress) {
        require(msg.sender == _studentAddress, "Only the student can access their own documents");
        _;
    }

    modifier onlyLegitimateUniversity(address _universityAddress) {
        require(universities[_universityAddress].approvedByGovernment && bytes(universities[_universityAddress].licenseNumber).length > 0, "Only a legitimate university can add a student");
        _;
    }

    function addStudent(string memory _name, address _studentAddress) public onlyLegitimateUniversity(msg.sender) {
        require(students[_studentAddress].documents.length == 0, "Student already exists");

        students[_studentAddress].name = _name;
        emit StudentAdded(_studentAddress, _name);
    }

    function addDocumentToStudent(address _studentAddress, string memory _documentName, string memory _hashValue) public onlyStudent(_studentAddress) {
        require(students[_studentAddress].documents.length == 0, "Student does not exist");

        for (uint i = 0; i < students[_studentAddress].documents.length; i++) {
            require(keccak256(abi.encodePacked(students[_studentAddress].documents[i].hashValue)) != keccak256(abi.encodePacked(_hashValue)), "Document already exists");
        }

        students[_studentAddress].documents.push(Document(_documentName, _hashValue));
        emit DocumentAdded(_studentAddress, _documentName, _hashValue);
    }

    function addUniversity(string memory _name, address _universityAddress, string memory _licenseNumber, bool _approvedByGovernment) public {
        if (universities[_universityAddress].approvedByGovernment) {
            emit UniversityAlreadyExists(_universityAddress, "University already exists");
            return;
        }

        require(!licenseNumbers[_licenseNumber], "License number already exists");

        universities[_universityAddress] = University(_name, _licenseNumber, _approvedByGovernment);
        licenseNumbers[_licenseNumber] = true;

        emit UniversityAdded(_universityAddress, _name);
    }

    function isUniversityLegitimate(address _universityAddress) public view returns (bool) {
        return universities[_universityAddress].approvedByGovernment && bytes(universities[_universityAddress].licenseNumber).length > 0;
    }

    function getDocumentCount(address _studentAddress) public view returns (uint) {
        return students[_studentAddress].documents.length;
    }

    function getDocumentDetails(address _studentAddress) public view onlyStudent(_studentAddress) returns (string[] memory, string[] memory) {
        Document[] memory studentDocuments = students[_studentAddress].documents;
        string[] memory documentNames = new string[](studentDocuments.length);
        string[] memory hashValues = new string[](studentDocuments.length);

        for (uint i = 0; i < studentDocuments.length; i++) {
            documentNames[i] = studentDocuments[i].name;
            hashValues[i] = studentDocuments[i].hashValue;
        }

        return (documentNames, hashValues);
    }
}
