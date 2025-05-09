import { type PropsWithChildren } from 'react';

function Heading2({ children }: PropsWithChildren) {
    return <h2 className="text-2xl pb-2 border-b-2">{children}</h2>
}

export { Heading2 };
