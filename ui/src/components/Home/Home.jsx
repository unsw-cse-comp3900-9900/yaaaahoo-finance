/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Button } from "@material-ui/core";
import { AuthUserContext, withAuthorization } from "../Session";
import TopNews from "../TopNews/TopNews";
import Portfolio from "../Portfolio/Portfolio";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddHoldingsModal from "./AddHoldingsModal";
import { config } from "../../config";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  page: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    overflowY: "auto",
    marginTop: "64px",
    paddingLeft: "10em",
    paddingRight: "10em",
    paddingTop: "10em",
    paddingBottom: "5em",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "2em",
      paddingRight: "2em",
      paddingTop: "2em",
      paddingBottom: "2em",
    },
  },
  searchButton: {
    cursor: "pointer",
    color: "#2643e9",
    marginLeft: "auto",
    "&:hover": {
      opacity: "0.5",
    },
    fontSize: "3em",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2em",
    },
  },
  addIcon: {
    margin: "1em 0",
    fontSize: "2em",
    marginRight: "0.3em",
    "&:hover": {
      opacity: "0.5",
    },
    cursor: "pointer",
  },
  heading: {
    fontSize: "1.5em",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:focus": {
      outline: "none",
    },
    outline: "none",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    "&:focus": {
      outline: "none",
    },
    outline: "none",
    display: "flex",
    flexDirection: "column",
    height: "300px",
    width: "300px",
    justifyContent: "space-evenly",
  },
  button: {
    width: "100px",
    height: "3em",
    color: "#2643e9",
    borderColor: "#2643e9",
    marginTop: "2em",
  },
  submitButton: {
    extend: "button",
    color: "#fff",
    backgroundColor: "#2643e9",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));
const Home = ({ firebase }) => {
  const classes = useStyles();
  const [userData, setUserData] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openAddHoldingsModal, setOpenAddHoldingsModal] = useState(false);
  const [openRemoveHoldingsModal, setOpenRemoveHoldingsModal] = useState(false);
  const [newPortfolioName, setNewPortfolioName] = useState("");
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [error, setError] = useState(false);
  const [relatedNews, setRelatedNews] = useState(null);

  const handleOpenAddModal = (portfolioId) => {
    setOpenAddModal(true);
    setSelectedPortfolio(portfolioId);
  };

  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setNewPortfolioName("");
    setSelectedPortfolio(null);
    setError(false);
  };

  const handleOpenEditModal = (portfolioId) => {
    setOpenEditModal(true);
    setSelectedPortfolio(portfolioId);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setNewPortfolioName("");
    setSelectedPortfolio(null);
    setError(false);
  };

  const handleOpenDeleteModal = (portfolioId) => {
    setOpenDeleteModal(true);
    setSelectedPortfolio(portfolioId);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedPortfolio(null);
  };

  const handleOpenAddHoldingsModal = (portfolioId) => {
    setOpenAddHoldingsModal(true);
    setSelectedPortfolio(portfolioId);
  };

  const handleCloseAddHoldingsModal = () => {
    setOpenAddHoldingsModal(false);
    setSelectedPortfolio(null);
  };

  const handleOpenRemoveHoldingsModal = (holdingId, portfolioId) => {
    setOpenRemoveHoldingsModal(true);
    setSelectedHolding(holdingId);
    setSelectedPortfolio(portfolioId);
  };

  const handleCloseRemoveHoldingsModal = () => {
    setOpenRemoveHoldingsModal(false);
    setSelectedHolding(null);
  };

  const handleChange = (e) => {
    setNewPortfolioName(e.target.value);
    setError(e.target.value === "");
  };

  const calcRecommendation = () => {
    const { risk, age } = userData;
    if (risk && age) {
      if (age === "Young") {
        if (risk === "High") setRecommendation("Wealth Maximiser");
        if (risk === "Balanced") setRecommendation("Wealth Builder");
        else setRecommendation("Stable Wealth");
      } else if (age === "Middle-aged") {
        if (risk === "High") setRecommendation("Wealth Builder");
        if (risk === "Balanced") setRecommendation("Stable Wealth");
        else setRecommendation("Wealth Secure");
      } else if (age === "Retiree") {
        if (risk === "High") setRecommendation("Wealth Secure");
        else setRecommendation("Income Generator");
      }
    }
  };

  useEffect(() => {
    if (!userData) return;
    calcRecommendation();
    if (userData.portfolios) setPortfolios(Object.values(userData.portfolios));
    else setPortfolios([]);
  }, [userData]);

  useEffect(() => {
    let companies = null;
    if(portfolios && portfolios.length > 0) {
      for (let portfolio of portfolios) {
        if (portfolio.holdings) {
          const companyNames = Object.values(portfolio.holdings).map(holding => holding.companyName);
          companies = companyNames;
          break;
        }
      }
    }
    setRelatedNews(companies);
  }, [portfolios]);

  useEffect(() => {
    firebase.getUserData().then((res) => {
      setUserData(res);
    });
  }, []);

  const addNewPortfolio = () => {
    if (error) return;
    firebase.initializePortfolio(newPortfolioName).then(() => {
      firebase.getUserData().then((res) => {
        setUserData(res);
      });
      setOpenAddModal(false);
      setNewPortfolioName("");
      setError(false);
    });
  };

  const deletePortfolio = (portfolioId) => {
    firebase.deletePortfolio(portfolioId).then(() => {
      firebase.getUserData().then((res) => {
        setUserData(res);
      });
      setOpenDeleteModal(false);
      setOpenAddModal(false);
      setNewPortfolioName("");
      setError(false);
    });
  };

  const editPortfolioName = (portfolioId) => {
    if (error) return;
    firebase.editPortfolioName(newPortfolioName, portfolioId).then(() => {
      firebase.getUserData().then((res) => {
        setUserData(res);
      });
      setOpenEditModal(false);
    });
  };

  const addHolding = (portfolioId, form) => {
    firebase.addHolding(portfolioId, form).then(() => {
      firebase.getUserData().then((res) => {
        setUserData(res);
      });
      setOpenAddHoldingsModal(false);
    });
  };

  const removeHolding = (portfolioId) => {
    if (!selectedHolding) return;
    firebase.removeHolding(portfolioId, selectedHolding).then(() => {
      firebase.getUserData().then((res) => {
        setUserData(res);
      });
      setOpenRemoveHoldingsModal(false);
    });
  };

  const getHoldingsInfo = async (holdings) => {
    let earnings = 0;
    const info = [];
    for (let holding of holdings) {
      const url = `https://cloud.iexapis.com/v1/stock/${holding.symbol}/quote?token=${config.iexCloudApiToken}`;
      await axios
        .get(url)
        .then(({ data }) => {
          const currentPrice = data.latestPrice;
          const currentPercentage = data.changePercent;
          const gain = holding.numberOfUnits * data.change;
          earnings += gain;
          const holdingInfo = {
            id: holding.id,
            symbol: holding.symbol,
            currentPrice,
            currentPercentage,
          };
          info.push(holdingInfo);
        })
        .catch((error) => {
          const holdingInfo = {
            id: holding.id,
            symbol: holding.symbol,
            currentPrice: "N/A",
            currentPercentage: "N/A",
          };
          info.push(holdingInfo);
        });
    }
    return { holdingsList: info, earnings };
  };

  return (
    <AuthUserContext.Consumer>
      {(authUser) => {
        return (
          <div className={classes.page}>
            {userData && recommendation ? (
              <Fragment>
                <div className={classes.header}>
                  <Typography className={classes.heading}>
                    <AddCircleIcon
                      className={classes.addIcon}
                      onClick={handleOpenAddModal}
                    />{" "}
                    Create new portfolio
                  </Typography>
                </div>

                {portfolios.map((portfolio, index) => (
                  <Fragment key={`portfolio-${index}`}>
                    <Portfolio
                      portfolio={portfolio}
                      getHoldingsInfo={(holdings) => getHoldingsInfo(holdings)}
                      recommendation={recommendation}
                      openDeleteModal={(portfolioId) =>
                        handleOpenDeleteModal(portfolioId)
                      }
                      openEditModal={(portfolioId) =>
                        handleOpenEditModal(portfolioId)
                      }
                      openAddHoldingsModal={(portfolioId) =>
                        handleOpenAddHoldingsModal(portfolioId)
                      }
                      openRemoveHoldingsModal={(holdingId, portfolioId) =>
                        handleOpenRemoveHoldingsModal(holdingId, portfolioId)
                      }
                    />
                  </Fragment>
                ))}
              </Fragment>
            ) : null}
            {openEditModal && (
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openEditModal}
                onClose={handleCloseEditModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openEditModal}>
                  <div className={classes.paper}>
                    <Typography className={classes.heading}>
                      Edit portfolio name
                    </Typography>
                    <TextField
                      onChange={handleChange}
                      onBlur={handleChange}
                      id="editPortfolio"
                      label="Portfolio name"
                      name="editPortfolio"
                      value={newPortfolioName}
                      error={error}
                      helperText={error ? "Name is required" : ""}
                    />
                    <div className={classes.buttonGroup}>
                      <Button
                        variant="outlined"
                        onClick={handleCloseEditModal}
                        className={classes.button}
                        disabled={error}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => editPortfolioName(selectedPortfolio)}
                        className={classes.submitButton}
                        disabled={error}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </Fade>
              </Modal>
            )}
            {openDeleteModal && (
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openDeleteModal}>
                  <div className={classes.paper}>
                    <Typography className={classes.heading}>
                      Are you sure you want to delete this portfolio?
                    </Typography>
                    <div className={classes.buttonGroup}>
                      <Button
                        variant="outlined"
                        onClick={handleCloseDeleteModal}
                        className={classes.button}
                        disabled={error}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => deletePortfolio(selectedPortfolio)}
                        className={classes.submitButton}
                        disabled={error}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Fade>
              </Modal>
            )}
            {openAddHoldingsModal && (
              <AddHoldingsModal
                isOpen={openAddHoldingsModal}
                onClose={handleCloseAddHoldingsModal}
                onSubmit={addHolding}
                portfolioId={selectedPortfolio}
              />
            )}
            {openRemoveHoldingsModal && (
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openRemoveHoldingsModal}
                onClose={handleCloseRemoveHoldingsModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openRemoveHoldingsModal}>
                  <div className={classes.paper}>
                    <Typography className={classes.heading}>
                      Are you sure you want to delete this holding?
                    </Typography>
                    <div className={classes.buttonGroup}>
                      <Button
                        variant="outlined"
                        onClick={handleCloseRemoveHoldingsModal}
                        className={classes.button}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => removeHolding(selectedPortfolio)}
                        className={classes.submitButton}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Fade>
              </Modal>
            )}
            {openAddModal && (
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openAddModal}
                onClose={handleCloseAddModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={openAddModal}>
                  <div className={classes.paper}>
                    <Typography className={classes.heading}>
                      Create new portfolio
                    </Typography>
                    <TextField
                      onChange={handleChange}
                      onBlur={handleChange}
                      id="newPortfolio"
                      label="Portfolio name"
                      name="portfolio"
                      value={newPortfolioName}
                      error={error}
                      helperText={error ? "Name is required" : ""}
                    />
                    <div className={classes.buttonGroup}>
                      <Button
                        variant="outlined"
                        onClick={handleCloseAddModal}
                        className={classes.button}
                        disabled={error}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="contained"
                        onClick={addNewPortfolio}
                        className={classes.submitButton}
                        disabled={error}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </Fade>
              </Modal>
            )}
            <TopNews title="Related News" titleColor="black" companies={relatedNews} />
          </div>
        );
      }}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser) => !!authUser;
export default withAuthorization(condition)(Home);
