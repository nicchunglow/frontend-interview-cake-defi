import React from 'react';
import DateAndTime from 'components/DateAndTime';
import Select from 'components/Select';
import { actionList, supportedTokensId } from './Exchange.constant';

const Exchange: React.FC = () => {
  return (
    <div className="flex justify-center rounded-lg w-2/4 h-2/4 border-1 shadow-lg">
      <div className="flex flex-col mt-8 w-full items-center">
        <h1 aria-label="exchange-header-text">La Coco Crypto Exchange</h1>
        <DateAndTime />
        <span className="flex justify-around w-full">
          <h2 aria-label="swap-token-text">Token to swap</h2>
          <h2 aria-label="receive-token-text">Token to Receive</h2>
        </span>
        <span className="flex justify-around w-full">
          {actionList.map((action) => {
            return (
              <Select
                key={`${action}-select`}
                aria-label={`${action}-token-select`}
                list={supportedTokensId}
                action={action}
              />
            );
          })}
        </span>
      </div>
    </div>
  );
};

export default Exchange;
