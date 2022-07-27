import { Select } from "antd";
import { Raw } from "types";

// React.ComponentProps能获取组件的props类型
type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
    extends Omit<
        SelectProps,
        "value" | "onChange" | "defaultOptionName" | "options"
    > {
    value: Raw | null | undefined;
    onChange: (value?: number) => void;
    defaultOptionName?: string;
    options?: { name: string; id: number }[];
}

/**
 * value 可以传入多种类型的值
 * onChange只会回调 number | undefined 类型
 * 当 isNaN(Number(value)) 为true的时候 代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 */
export const IdSelect = (props: IdSelectProps) => {
    let { value, onChange, defaultOptionName, options, ...restProps } = props;

    return (
        <Select
            value={options?.length ? toNumber(value) : 0}
            onChange={(value) => onChange(toNumber(value) || undefined)}
            {...restProps}
        >
            {defaultOptionName ? (
                <Select.Option value={0}>{defaultOptionName}</Select.Option>
            ) : null}
            {options?.map((option) => (
                <Select value={option.id} key={option.id}>
                    {option.name}
                </Select>
            ))}
        </Select>
    );
};

function toNumber(value: any): number {
    return isNaN(Number(value)) ? 0 : Number(value);
}
