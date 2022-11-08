import React from "react"

function Select({ options, onChange, ...props }) {
    const selectRef = React.useRef(null)

    // const [usingOptions, SetUsingOptions] = React.useState(options);

    const usingOptions = options
    const [open, SetOpen] = React.useState(false)
    const [SelectedOption, SetSelectedOption] = React.useState(
        usingOptions.find(({ option }) => option === true)
    )

    const UpdateOption = (e) => {
        const target = e.target

        const SelectedOption = usingOptions.find(
            Option => Option.value === target.getAttribute("value")
        )

        const Updated = usingOptions?.map(option => {
            if (option === SelectedOption) option.option = true
            else option.option = false

            return option
        })
        if (
            typeof Updated !== void [] &&
            Updated !== undefined &&
            Updated !== null
        ) {
            SetSelectedOption(usingOptions.find(option => option === SelectedOption))
        }
    }
    React.useEffect(() => {
        document.addEventListener("mouseup", e => {
            if (selectRef.current && selectRef.current?.contains(e.target))
                SetOpen(false)
        })
        onChange(SelectedOption)
    }, [onChange, SelectedOption])

    return (
        <>
            <div className="G_Form-selectWrapper" {...props} ref={selectRef}>
                <input
                    type="text"
                    className={"G_Form-SelectToggle" + (open ? " isActive" : "")}
                    role="listbox"
                    readOnly={true}
                    onClick={() => SetOpen(!open)}
                    value={SelectedOption?.label}
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                </svg>
                <div className={"G_SelectDropdown " + (open ? " isOpen" : "")}>
                    <ul>
                        {usingOptions.map(({ option, id, value, label }) => {
                            return (
                                <li
                                    className={
                                        "G_SelectDropdown-item" + (option ? " isActive" : "")
                                    }
                                    onClick={e => UpdateOption(e)}
                                    value={value}
                                    key={id}
                                >
                                    {label}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}
// module.exports = Select;
export default Select;
