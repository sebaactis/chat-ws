const errorHandler = (err, req, res, next) => {
    if (err?.message.includes('Not Found')) {
      return res.status(400).json({ message: err.message });
    }
    else if (err.message.includes('Already Exists')) {
      return res.status(400).json({ message: err.message });
    }
    else if (err.message.includes('not match')) {
      return res.status(400).json({ message: err.message });
    }
    else if (err?.name.includes('Zodwarning')) {
      return res.status(400).json({ message: err.issues });
    }
  
    res.status(500).json({ message: err.message });
  };
  
  export default errorHandler;