import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
// import DataTable from '../ui/DataTable';
import Button from '../ui/Button';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await api.get('/articles');
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/articles/${id}`);
      setArticles(articles.filter(article => article.id !== id));
    } catch (err) {
      console.error('Failed to delete article:', err);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'author', headerName: 'Author', width: 150 },
    { field: 'publish_date', headerName: 'Publish Date', width: 120 },
    { field: 'views', headerName: 'Views', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <div className="action-buttons">
          <Link to={`/articles/edit/${params.row.id}`}>
            <Button size="small">Edit</Button>
          </Link>
          <Button 
            size="small" 
            variant="danger" 
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="content-page">
      <div className="page-header">
        <h2>Articles</h2>
        <Link to="/articles/new">
          <Button>Create New Article</Button>
        </Link>
      </div>
      <DataTable rows={articles} columns={columns} />
    </div>
  );
};

export default Articles;