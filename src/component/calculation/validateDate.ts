interface Props {
    Day: string,
    Month: string,
    Year: string
}

export default function validateDate(props: Props) {
    let Year = Math.floor(Number(props.Year))
    let Month = Math.floor(Number(props.Month))
    let Day = Math.floor(Number(props.Day))

    
    const timestamp = (new Date("".concat(props.Year,"-",props.Month,"-",props.Day)).getTime()/1000).toString()
    const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
    
    if (Month > 0 && Month <=12 && Year > 1970 && Year <= 2022 && Day > 0) {
        if (Year % 4 === 0) {
            if (Month === 2 && Day <= 29) {
                return {
                    "timestamp": timestamp,
                    "valid": true
                }            
            }
            else if (Day <= monthLength[Month - 1]) {
                return {
                    "timestamp": timestamp,
                    "valid": true
                }            
            }
            else {
                return {
                    "timestamp": timestamp,
                    "valid": false
                }            
            }
        }
        
        else if (Day <= monthLength[Month - 1]) {
            return {
                "timestamp": timestamp,
                "valid": true
            }            

        }
        else {
            return {
                "timestamp": timestamp,
                "valid": false
            }
        }
    }

    return {
        "timestamp": timestamp,
        "valid": false
    }
}
