import { useEffect, useState } from 'react';
import api from '../../../services/api';
import StatsCard from '../ui/StatsCards';
import './Dashboard.scss'



const Dashboard = () => {

  const [stats, setStats] = useState({
    articles: 0,
    podcasts: 0,
    guides: 0,
    products: 0,
    users: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          // articlesRes,
          // podcastsRes,
          // guidesRes,
          // productsRes,
          usersRes,
        ] = await Promise.all([
          // api.get('/articles/count'),
          // api.get('/podcasts/count'),
          // api.get('/guides/count'),
          // api.get('/products/count'),
          api.get('/accounts/count'),
        ]);

        setStats({
          // articles: articlesRes.data.count,
          // podcasts: podcastsRes.data.count,
          // guides: guidesRes.data.count,
          // products: productsRes.data.count,
          users: usersRes.data.count,
        });
      } catch (err) {
        console.error('Failed to fetch stats:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard-page">
      <h2>Overview</h2>
      <div className="stats-grid">
        <StatsCard title="Articles" value={stats.articles} icon="article" />
        <StatsCard title="Podcasts" value={stats.podcasts} icon="podcast" />
        <StatsCard title="Guides" value={stats.guides} icon="guide" />
        <StatsCard title="Products" value={stats.products} icon="product" />
        <StatsCard title="Users" value={stats.users} icon="user" trend = {stats.users}  url_Link='users' />
      </div>
      
      {/* Recent activity section */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        {/* Activity list component */}


      </div>
    </div>
  );
};

export default Dashboard;