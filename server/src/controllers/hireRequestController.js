const HireRequest = require('../models/HireRequest');

// Create new hire request
exports.createHireRequest = async (req, res) => {
  try {
    const hireRequest = new HireRequest(req.body);
    await hireRequest.save();

    res.status(201).json({
      success: true,
      message: 'Hire request submitted successfully',
      data: hireRequest
    });
  } catch (error) {
    console.error('Error creating hire request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit hire request',
      error: error.message
    });
  }
};

// Get all hire requests (admin)
exports.getAllHireRequests = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, requestType } = req.query;
    
    const query = {};
    if (status) query.status = status;
    if (requestType) query.requestType = requestType;

    const hireRequests = await HireRequest.find(query)
      .sort({ submittedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await HireRequest.countDocuments(query);

    res.status(200).json({
      success: true,
      data: hireRequests,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching hire requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hire requests',
      error: error.message
    });
  }
};

// Get single hire request by ID
exports.getHireRequestById = async (req, res) => {
  try {
    const hireRequest = await HireRequest.findById(req.params.id);
    
    if (!hireRequest) {
      return res.status(404).json({
        success: false,
        message: 'Hire request not found'
      });
    }

    res.status(200).json({
      success: true,
      data: hireRequest
    });
  } catch (error) {
    console.error('Error fetching hire request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hire request',
      error: error.message
    });
  }
};

// Update hire request status
exports.updateHireRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const hireRequest = await HireRequest.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!hireRequest) {
      return res.status(404).json({
        success: false,
        message: 'Hire request not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Hire request status updated successfully',
      data: hireRequest
    });
  } catch (error) {
    console.error('Error updating hire request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update hire request',
      error: error.message
    });
  }
};

// Delete hire request
exports.deleteHireRequest = async (req, res) => {
  try {
    const hireRequest = await HireRequest.findByIdAndDelete(req.params.id);
    
    if (!hireRequest) {
      return res.status(404).json({
        success: false,
        message: 'Hire request not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Hire request deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting hire request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete hire request',
      error: error.message
    });
  }
};

// Get hire request statistics
exports.getHireRequestStats = async (req, res) => {
  try {
    const stats = await HireRequest.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const requestTypeStats = await HireRequest.aggregate([
      {
        $group: {
          _id: '$requestType',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalRequests = await HireRequest.countDocuments();
    const recentRequests = await HireRequest.countDocuments({
      submittedAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    });

    res.status(200).json({
      success: true,
      data: {
        statusStats: stats,
        requestTypeStats,
        totalRequests,
        recentRequests
      }
    });
  } catch (error) {
    console.error('Error fetching hire request stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hire request statistics',
      error: error.message
    });
  }
};
