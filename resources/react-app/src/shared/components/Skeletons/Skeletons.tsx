import React from "react";
import cx from "classnames";

type SkeletonsProps = {
    rows: number;
    mb: number;
    className?: string;
};

export const ElementSkeleton = () => (
    <>
        <div className="shortloadingLine w-100 mb-3" />
        <div className="shortloadingLine w-50" />
    </>
);

export const Skeletons: React.FC<SkeletonsProps> = ({ rows, mb, className }) => {
    const skeletons = new Array(rows).fill({ skeleton: 0 });
    return (
        <div className={className}>
            {skeletons.map((skeleton, index) => (
                <div className={cx(`mb-${mb}`)} key={index}>
                    <ElementSkeleton />
                </div>
            ))}
        </div>
    );
};
