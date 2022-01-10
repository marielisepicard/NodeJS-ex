exports.generateErrorMessage = (error) => {
  return {
    Error: error,
    Usage: "/getOpenJobsInfos/<Company's name>",
    Example: "http://localhost:3000/getOpenJobsInfos/netflix",
  };
};

exports.formatJobOffers = (data, company, url) => {
  let openJobs = data.map((job) => {
    return {
      lever_id: job.id,
      name: job.text,
      department: job.categories.department,
      jobUrl: job.hostedUrl,
      contract: job.categories.commitment + " contract",
      team: job.categories.team,
      location: job.categories.location,
      publishedAt: job.createdAt,
    };
  });
  let jobOffers = {
    companyName: company,
    endpointLever: url,
    nbrOpenJob: data.length,
    openJobs: openJobs,
  };
  return jobOffers;
};
