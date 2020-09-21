import React, { useState, useEffect} from "react";

const Course = (props) => {
    const [department, setDepartment] = useState("");
    const [courseNum, setCourseNum] = useState("");
    const [year, setYear] = useState("");
    const [semester, setSemester] = useState("");
    const [hideT, setHideT] = useState(true);
    const [formState, setFormState] = useState({
        input: ""
    })
    
    const onChangeHandler = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e) => {
        setHideT(false);
        let input = formState.input;
        let splited = input.split(' ');
        let dept = "";
        let num = "";
        let sem = "";
        let yr = "";
        let count = 0;
        for (let i = 0; i < splited[0].length; i++) {
            if (isLetter(splited[0][i])) {
                while (i < splited[0].length && isLetter(splited[0][i])) {
                    dept += splited[0][i];
                    i++;
                }
                setDepartment(dept);
            }
            if (i < splited[0].length) {
                if (!isDigit(splited[0][i])) {
                    i++;
                }
                while (i < splited[0].length && !isLetter(splited[0][i])) {
                    num += splited[0][i];
                    i++;
                }
                setCourseNum(num);
                count++;
            } else {
                setCourseNum(splited[1]);
                count += 2;
            }
        }
        let currentLength = splited[count].length;
        for (let i = 0; i < currentLength; i++) {
            if (isLetter(splited[count][i])) {
                while (i < currentLength && isLetter(splited[count][i])) {
                    sem += splited[count][i];
                    i++;
                }
                setSemester(identifySemester(sem));
                if (i < currentLength) {
                    while (i < splited[count].length && isDigit(splited[count][i])) {
                        yr += splited[count][i];
                        i++;
                    }
                } else {
                    yr += splited[count + 1];
                }
                setYear(identifyYear(yr));
            } else {
                while (i < currentLength && isDigit(splited[count][i])) {
                    yr += splited[count][i];
                    i++;
                }
                setYear(identifyYear(yr));
                if (i < currentLength) {
                    while (i < splited[count].length && isLetter(splited[count][i])) {
                        sem += splited[count][i];
                        i++;
                    }
                    setSemester(identifySemester(sem));
                }
            }
        }
    }

    useEffect(() => {
        console.log("display results");
    }, [submitHandler])

    function isLetter(ch) {
        return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
    }

    function isDigit(ch) {
        return ch >= '0' && ch <= '9';
    }

    //I refactored the code by extracting identifySemester and identifyYear out of the main function

    function identifySemester(sem) {
        if (sem[0] === 'F' || sem[0] === 'f') {
            return "Fall";
        } else if (sem[0] === 'W' || sem[0] === 'w') {
            return "Winter";
        } else {
            if (sem[1] === 'u' || sem[1] === 'U') {
                return "Summer";
            } else {
                return "Spring";
            }
        }
    }

    function identifyYear(yr) {
        if (yr.length === 2) {
            return "20" + yr;
        }
        return yr;
    }

    return (
        <div className="container">
            <div className="card-body">
                <input type="text" name="input" onChange={onChangeHandler} />
                <button onClick={submitHandler}>Submit</button>
            </div>
            <div className="table" hidden={hideT}>
                <table>
                    <thead>
                        <tr>
                            <th>Department</th>
                            <th>Course Number</th>
                            <th>Year</th>
                            <th>Semester</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{department}</td>
                            <td>{courseNum}</td>
                            <td>{year}</td>
                            <td>{semester}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Course;