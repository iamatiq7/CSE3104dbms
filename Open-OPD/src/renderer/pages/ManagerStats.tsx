import { PieChart } from 'react-minimal-pie-chart';
import BackButton from 'renderer/components/BackButton';

function ManagerStats() {
  return (
    <div>
      <BackButton />
      {/* <div className="navbar bg-neutral text-neutral-content"></div> */}

      <div className="p-5">
        <div className="flex items-stretch justify-start gap-5">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Total Patients</div>
              <div className="stat-value">89,400</div>
              <div className="stat-desc">21% more than last month</div>
            </div>
          </div>
          <div className="stats shadow ml-auto">
            <div className="stat">
              <div className="stat-title">Account Balance</div>
              <div className="stat-value">৳89,400</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </div>
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Payable</div>
              <div className="stat-value">৳65,500</div>
              {/* <div className="stat-desc">21% more than last month</div> */}
            </div>
          </div>
          <div className="w-32 h-32 ml-auto">
            <PieChart
              data={[
                { title: 'Male', value: 45, color: '#02A3FE' },
                { title: 'Female', value: 55, color: '#EC49A6' },
              ]}
              label={({ dataEntry }) =>
                `${dataEntry.title} (${dataEntry.value}%)`
              }
              labelStyle={() => ({
                fontSize: '0.6rem',
              })}
            />
          </div>
        </div>
        <h1 className="text-3xl mt-7">Recent Patients</h1>
        <div className="overflow-x-auto mt-5 max-h-96 border">
          <table className="table w-full">
            <thead>
              <tr>
                <th className="bg-base-300">#</th>
                <th className="bg-base-300">Name</th>
                <th className="bg-base-300">Gender</th>
                <th className="bg-base-300">Age</th>
                <th className="bg-base-300">Phone</th>
                <th className="bg-base-300">Doctor&apos;s Name</th>
                <th className="bg-base-300">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Male</td>
                <td>29</td>
                <td>01258788998</td>
                <td>Dr. Shah-noor Hasan</td>
                <td className="bg-warning">Waiting</td>
              </tr>

              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Female</td>
                <td>25</td>
                <td>01258788998</td>
                <td>Dr. Jahanara Imam</td>
                <td className="bg-info">Visiting</td>
              </tr>

              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Male</td>
                <td>12</td>
                <td>01258788998</td>
                <td>Dr. Jahanara Imam</td>
                <td className="bg-success">Visited</td>
              </tr>

              <tr>
                <th>3</th>
                <td>Brice Swyrsae</td>
                <td>Female</td>
                <td>45</td>
                <td>01258788998</td>
                <td>Dr. Kuddus</td>
                <td className="bg-error">Canceled</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Brice Swyrsae</td>
                <td>Female</td>
                <td>45</td>
                <td>01258788998</td>
                <td>Dr. Selim</td>
                <td className="bg-error">Canceled</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Brice Swyrsae</td>
                <td>Female</td>
                <td>45</td>
                <td>01258788998</td>
                <td>Dr. Zahid</td>
                <td className="bg-error">Canceled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManagerStats;
