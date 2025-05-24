"use client";

import Select from "react-select";

const MultiSelect = ({
    title,
    renderOptions,
    name,
    defaultValueRenderer,
    onChange,
    isLoading = false,
}) => {
    const allOptions = renderOptions();

    const defaultValues = defaultValueRenderer();

    const sortedOptions = [
        ...defaultValues,
        ...allOptions.filter(
            (opt) => !defaultValues.some((sel) => sel.value === opt.value)
        ),
    ];

    return (
        <label className="form-control w-full max-w-2xl">
            <div className="label">
                <span className="label-text font-semibold">{title}</span>
            </div>
            <Select
                name={name}
                options={sortedOptions}
                isMulti
                isLoading={isLoading}
                className="basic-multi-select"
                classNamePrefix="select"
                defaultValue={defaultValues}
                onChange={onChange}
                menuPortalTarget={
                    typeof window !== "undefined" ? document.body : null
                }
                menuPosition="fixed"
                styles={{
                    menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999,
                    }),
                    menu: (base) => ({
                        ...base,
                        zIndex: 9999,
                        overflowY: "auto",
                    }),
                    control: (base) => ({
                        ...base,
                        minHeight: "38px",
                    }),
                }}
                menuPlacement="auto"
            />
        </label>
    );
};

export default MultiSelect;
