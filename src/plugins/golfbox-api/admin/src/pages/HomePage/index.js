/*
 *
 * HomePage
 *
 */

import React from "react";
import he from "he";
const { convert } = require('html-to-text');
import CKeditor from '@ckeditor/ckeditor5-react';
import {
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Typography,
  Layout,
  ContentLayout,
  Box,
  Flex,
  Loader,
  Combobox,
  ComboboxOption,
  BaseHeaderLayout,
  Accordion,
  AccordionToggle,
  AccordionContent,
  AccordionGroup,
  Button,
  Divider,
} from "@strapi/design-system";
import { getClasses, getTournaments, getInfo } from "../../utils/api";

const HomePage = () => {
  const [hasSetup, setHasSetup] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [tournamentId, setTournamentId] = React.useState("");
  const [infoData, setInfoData] = React.useState("");
  const [hasLeaders, setHasLeaders] = React.useState(false);
  const [getLeaders, setLeaderboards] = React.useState({});
  const [expanded, setExpanded] = React.useState(false);
  const [classes, setClasses] = React.useState([]);
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const [tournamentName, setTournamentName] = React.useState("");
  const [reset, setReset] = React.useState(false);

  React.useEffect(async () => {
    try {
      const { data } = await getTournaments();
      setHasSetup(data);
      setIsLoading(false);
      setTournamentId(data[0].ID);
      const { data: info } = await getInfo(data[0].ID);
      const text = decodeHtml(info.PublicInformation.Description);
            const options = {
              wordwrap: 130,
              // ...
            };
      setInfoData(convert(text, options));
    } catch (error) {
      console.error(error);
    }
    return () => {
      setHasSetup(false);
      setIsLoading(true);
    };
  }, []);

  React.useEffect(async () => {
    setLeaderboards({});
    setClasses([]);
    setHasLeaders(false);
    setBtnDisabled(true);
    setTournamentName("");
    setReset(false);
  }, [reset]);


  function filterLeaderboard(Leaderboard) {
    //console.log("Lead: ", Leaderboard);
    const lArray = [];
    Object.keys(Leaderboard).forEach(entrie => {
      if (Leaderboard[entrie].Position.Actual < 15) {
        //console.log("Pos: ", Leaderboard[entrie].FirstName + Leaderboard[entrie].LastName);
        lArray.push(Leaderboard[entrie]);
        return Leaderboard[entrie];
      }
    }); // Leaderboard.filter((entrie) => entrie.Position.Actual <= 15);
    return lArray;
  }

  async function getLeaderboards(data, tournamentId) {
    let leaderboardArray = [];
    if (data) {
      for (let i = 0; i < data.length; i++) {
        const response = await fetch(
          `https://golfbox.sveitan.is/getLeaderboard/${String(
            data[i].Id
          )}/${String(tournamentId)}`
        );
        const jsonData = await response.json();
        const top15 = filterLeaderboard(
          jsonData.Classes[`C${String(data[i].Id)}`].Leaderboard.Entries
        );
        leaderboardArray.push(top15);
      }
      setLeaderboards(leaderboardArray);
      return leaderboardArray;
    }
  }
  React.useEffect(async() => {
    if(tournamentId === "") return;

  }, [infoData. classes])
  React.useEffect(
    async () => {
      setBtnDisabled(true);
      setHasLeaders(false);
      console.log("Text: ", tournamentId)
      try {
        if (tournamentId) {
          const { data } = await getClasses(tournamentId);
          const classesData = data;
          setClasses(classesData);
          //console.log(tournamentId, await getInfo(tournamentId));
          const { data: info } = await getInfo(tournamentId);
          console.log("Info: ","hér")
          if (classesData) {
            console.log("Info: ", "Þar");
            await getLeaderboards(classesData, tournamentId);
            console.log("Info: ", "Þar1");
            let text = decodeHtml(info.PublicInformation.Description);
            console.log("Info: ", "Þar2");
            const options = {
              wordwrap: 130,
              // ...
            };
            text = convert(text, options)
            console.log("Info: ", "Þar3");
            console.log("Info: ", text);
            setInfoData(text);
            setIsLoading(false);
            setHasLeaders(true);
            setBtnDisabled(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
      return () => {
        // cleanup function
        setBtnDisabled(true);
        setHasLeaders(false);
        setLeaderboards([]);
        setHasSetup(false);
        setIsLoading(true);
      };
    },
    [tournamentId]
  );
  const handleToggle = id => () => {
    setExpanded(s => s === id ? null : id);
  };
  
  
  
  async function postResults() {
    try {
      const body = getLeaders
      console.log("Body: ", body);
      const formData = {
        "data": {
          "title": "Úrslit úr " + tournamentName,
          "Urslit": [
            {
              "__component": "shared.urslit",
              "Urslit": body[0]
            },
            {
              "__component": "shared.urslit",
              "Urslit": body[1]
            },
            {
              "__component": "shared.urslit",
              "Urslit": body[2]
            }
          ]
        }
      }
      const response = await fetch("http://localhost:1337/api/blogs", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
          Authentication: 'Bearer 1cf4c3e2c5e3a61bb118790122adf12a120c843626e570d401e01e17e62d882e12c86c01debaeab125a3cdc69a45c67934cdeffae838de5bc0b141d407de1364ea1949cc0edbced52416ffc5e39b8c88f2935f73d23d7a81772df6ffb8aafc96f03cc5f749ad417d69475d050ef79e40847b41797fbcd5cb814e397707c2e93b'
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
  async function onChangeHandler(event) {
    //console.log("Þetta er event: ", typeof(event));
    setReset(true);
    setTournamentId(event);
    const { data: info } = await getInfo(event);
      const text = decodeHtml(info.PublicInformation.Description);
            const options = {
              wordwrap: 130,
              // ...
            };
    setInfoData(convert(text, options));
    //const myinfo = await getInfo(tournamentId);
    //setInfoData(myinfo.data.PublicInformation.Description);
    //console.log("Þetta er myinfo: ", myinfo);
    //setTournamentName(hasSetup[event].Name);
    //console.log("Hefur setup: ", hasSetup.map(item => String(item.ID) === event ? setTournamentName(item.Name): null));
    //console.log("Þetta er nafn: ", tournamentName);
  }
  return (
    <Layout>
      <BaseHeaderLayout
        title="GolfBox API"
        subtitle="Sækja úrslit móta og birta sem frétt!"
      />
      <ContentLayout>
        {isLoading
          ? <Loader small>Loading content...</Loader>
          : <Box color="neutral800" padding={4} background="neutral0">
                <Combobox
                  label="Mótaskrá"
                  value={String(tournamentId)}
                  onChange={onChangeHandler}
                >
                  {hasSetup.map(item =>
                    //console.log("Þetta er item t : ", item),
                    <ComboboxOption key={item.ID} value={String(item.ID)}>
                      {item.Name}
                    </ComboboxOption>
                  )}
                </Combobox>
                <Box padding={1}>
                  <Divider />
                </Box>
                <Flex direction="row" alignItems="flex-start" gap={2}>
                    <Box padding={2}>
                      <Button size="L" disabled={btnDisabled}  onClick={() => postResults()}>
                        Birta Úrslit
                      </Button>
                    </Box>
                    <Box padding={2}>
                      <Button size="L"  onClick={() => {}}>
                        Birta Upplýsingar
                      </Button>
                    </Box>
                  </Flex>
                <Textarea name="infobox" value={infoData} />
                <AccordionGroup height="48px" background="neutral150">
                {hasLeaders
                  ? getLeaders.map((entry, index) =>
                      
                        <Accordion
                          //expanded={expanded}
                          expanded={expanded === `acc-${index}`}
                          onToggle={handleToggle(`acc-${index}`)}
                          //onToggle={() => setExpanded(s => !s)}
                          id={`acc-${index}`}
                          size="S"
                          key={index}
                        >
                          <AccordionToggle title={classes[index].Name} />
                          <AccordionContent>
                            <Box padding={3}>
                              <Table
                                label={"fsdf"}
                                key={index}
                                colCount={5}
                                rowCount={15}
                              >
                                <Thead>
                                  <Tr>
                                    <Th>
                                      <Typography variant="sigma">
                                        Nafn
                                      </Typography>
                                    </Th>
                                    <Th>
                                      <Typography variant="sigma">
                                        Sæti
                                      </Typography>
                                    </Th>
                                    <Th>
                                      <Typography variant="sigma">
                                        Punktar/Skor
                                      </Typography>
                                    </Th>
                                    <Th>
                                      <Typography variant="sigma">
                                        Mismunur
                                      </Typography>
                                    </Th>
                                  </Tr>
                                </Thead>
                                <Tbody>
                                  {entry.map(
                                    entrie => (
                                     //console.log("Ent: ", entrie),
                                      (
                                        <Tr key={entrie.Number}>
                                          <Td>
                                            <Typography textColor="neutral800">
                                              {entrie.FirstName +
                                                entrie.LastName}
                                            </Typography>
                                          </Td>
                                          <Td>
                                            <Typography textColor="neutral800">
                                              {String(entrie.Position.Actual)}
                                            </Typography>
                                          </Td>
                                          <Td>
                                            <Typography textColor="neutral800">
                                              {String(
                                                entrie.ResultSum.ActualText
                                              )}
                                            </Typography>
                                          </Td>
                                          <Td>
                                            <Typography textColor="neutral800">
                                              {String(
                                                entrie.ResultSum.ToParText
                                              )}
                                            </Typography>
                                          </Td>
                                        </Tr>
                                      )
                                    )
                                  )}
                                </Tbody>
                              </Table>
                            </Box>
                          </AccordionContent>
                        </Accordion>
                    )
                  : null}
                  </AccordionGroup>
                  
            </Box>
            }
            <Box color="neutral800" padding={4} background="neutral0"></Box>
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
