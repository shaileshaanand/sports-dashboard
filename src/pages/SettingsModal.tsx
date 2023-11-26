/* eslint-disable no-param-reassign */
import {
  Button,
  Checkbox,
  Flex,
  Group,
  Modal,
  Stack,
  Title,
  useCombobox,
  useMantineTheme,
} from "@mantine/core";
import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import useSports from "../hooks/useSports";
import useTeams from "../hooks/useTeams";
import useUpdatePreferencesMutation from "../hooks/useUpdatePreferencesMutation";
import useUserPrefrences from "../hooks/useUserPrefrences";
import { UserPreferences } from "../types";

const preferencesReducer = (
  state: UserPreferences,
  action:
    | {
        type: "addSport" | "addTeam" | "removeTeam";
        payload: number;
      }
    | {
        type: "set";
        payload: UserPreferences;
      }
    | {
        type: "removeSport";
        payload: {
          sportId: number;
          teamIds: number[];
        };
      }
): UserPreferences => {
  switch (action.type) {
    case "addSport":
      return {
        ...state,
        preferences: {
          ...state.preferences,
          favoriteSports: [...state.preferences.favoriteSports, action.payload],
        },
      };
    case "removeSport":
      return {
        ...state,
        preferences: {
          ...state.preferences,
          favoriteSports: state.preferences.favoriteSports.filter(
            (sportId) => sportId !== action.payload.sportId
          ),
          favoriteTeams: state.preferences.favoriteTeams.filter(
            (teamId) => !action.payload.teamIds.includes(teamId)
          ),
        },
      };
    case "addTeam":
      return {
        ...state,
        preferences: {
          ...state.preferences,
          favoriteTeams: [...state.preferences.favoriteTeams, action.payload],
        },
      };
    case "removeTeam":
      return {
        ...state,
        preferences: {
          ...state.preferences,
          favoriteTeams: state.preferences.favoriteTeams.filter(
            (favorite) => favorite !== action.payload
          ),
        },
      };
    case "set":
      return action.payload;
    default:
      return state;
  }
};

const SettingsModal = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();

  const { data: sportsList } = useSports();
  const { data: teamsList } = useTeams();
  const { data: prefrencesData, isLoading: isUserPrefrencesLoading } =
    useUserPrefrences();

  const [preferences, dispatchPrefrences] = useReducer(preferencesReducer, {
    preferences: {
      favoriteSports: [],
      favoriteTeams: [],
    },
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  useEffect(() => {
    if (prefrencesData) {
      dispatchPrefrences({
        type: "set",
        payload: prefrencesData,
      });
    }
  }, [prefrencesData]);

  const updatePreferencesMutation = useUpdatePreferencesMutation();

  return (
    <Modal
      opened
      centered
      size="85%"
      title="Settings"
      onClose={() => navigate(-1)}
      styles={{
        title: {
          fontWeight: theme.headings.fontWeight,
          fontSize: theme.headings.sizes.h3.fontSize,
        },
      }}
    >
      <Title order={4} mb="md">
        Favorite Sports
      </Title>
      {sportsList && teamsList && !isUserPrefrencesLoading ? (
        <Stack>
          {sportsList.sports.map((sport) => (
            <>
              <Checkbox
                label={sport.name}
                key={sport.id}
                checked={preferences.preferences.favoriteSports.includes(
                  sport.id
                )}
                onChange={(e) => {
                  if (e.target.checked) {
                    dispatchPrefrences({
                      type: "addSport",
                      payload: sport.id,
                    });
                  } else {
                    dispatchPrefrences({
                      type: "removeSport",
                      payload: {
                        sportId: sport.id,
                        teamIds: teamsList
                          .filter((team) => team.plays === sport.name)
                          .map((team) => team.id),
                      },
                    });
                  }
                }}
              />
              {preferences.preferences.favoriteSports.includes(sport.id) && (
                <Group ml="lg">
                  {teamsList
                    .filter((team) => team.plays === sport.name)
                    .map((team) => (
                      <Checkbox
                        label={team.name}
                        key={team.id}
                        checked={preferences.preferences.favoriteTeams.includes(
                          team.id
                        )}
                        onChange={(e) => {
                          if (e.target.checked) {
                            dispatchPrefrences({
                              type: "addTeam",
                              payload: team.id,
                            });
                          } else {
                            dispatchPrefrences({
                              type: "removeTeam",
                              payload: team.id,
                            });
                          }
                        }}
                      />
                    ))}
                </Group>
              )}
            </>
          ))}
        </Stack>
      ) : (
        "Loading..."
      )}
      <Flex justify="flex-end">
        <Button
          mt="md"
          onClick={() => updatePreferencesMutation.mutate(preferences)}
        >
          Save
        </Button>
      </Flex>
    </Modal>
  );
};

export default SettingsModal;
