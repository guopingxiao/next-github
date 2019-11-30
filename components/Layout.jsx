
import Link from 'next/link';
import { Button } from 'antd';
import { Fragment } from 'react';
export default ({children})=>(
    <>
            <header>
                 <Link href="/a?id=1" as="/a/1">
                        <Button>A</Button>
                      </Link>
                  <Link href="/test/b">
                        <Button>B</Button>
                      </Link>
                </header>
        {children}
    </>
)