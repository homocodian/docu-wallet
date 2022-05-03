import { useState, useEffect } from "react";
import { ScrollView, Text, View, RefreshControl } from "react-native";

import { Searchbar } from "react-native-paper";
import { ActivityIndicator } from "@react-native-material/core";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import useDebounce from "../hooks/useDebounce";
import { AppTheme, RootStackParamList } from "../types";
import { Card } from "../components/Card";
import { DocumentCard } from "../components/DocumentCard";
import { NoteCard } from "../components/NoteCard";
import { DocCardItem } from "./DocumentCard/types";
import { NoteCardItem } from "./NoteCard/types";
import { CardItem } from "./Card/types";
// database dao
import cardDao from "../db/dao/Card";
import noteDao from "../db/dao/Note";
import documentDao from "../db/dao/Document";

export type SearchComponentProps = {
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    "Search",
    undefined
  >;
  theme: AppTheme;
  tabIndex: number;
};

const SearchComponent: React.FC<SearchComponentProps> = ({
  navigation,
  theme,
  tabIndex,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearchTerm: string = useDebounce(searchQuery, 500);
  const [cardsResult, setCardsResult] = useState<CardItem[]>([]);
  const [documentsResult, setDocumentsResult] = useState<DocCardItem[]>([]);
  const [notesResult, setNotesResult] = useState<NoteCardItem[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onChangeSearch = (text: string) => {
    setSearchQuery(text);
  };

  const search = async () => {
    if (tabIndex === 0) {
      try {
        // @ts-ignore
        const data: any[] = await cardDao.search(debouncedSearchTerm);
        if (data.length > 0) {
          const result = data.map((item) => ({
            id: item.id,
            backImageUri: item.backImageUri,
            cardName: item.cardName,
            cardNumber: item.cardNumber,
            createdAt: item.createdAt,
            frontImageUri: item.frontImageUri,
            updatedAt: item.updatedAt,
          }));
          setCardsResult(result);
        } else {
          setCardsResult([]);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsSearching(false);
      }
    } else if (tabIndex === 1) {
      try {
        // @ts-ignore
        const data: any[] = await documentDao.search(debouncedSearchTerm);
        if (data.length > 0) {
          const result = data.map((item) => ({
            id: item.id,
            name: item.name,
            uid: item.uid,
            fileName: item.fileName,
            fileSize: item.fileSize,
            fileUri: item.fileUri,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          }));
          setDocumentsResult(result);
        } else {
          setDocumentsResult([]);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsSearching(false);
      }
    } else {
      try {
        // @ts-ignore
        const data: any[] = await noteDao.search(debouncedSearchTerm);
        if (data.length > 0) {
          const result = data.map((item) => ({
            id: item.id,
            title: item.title,
            note: item.note,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          }));
          setNotesResult(result);
        } else {
          setNotesResult([]);
        }
      } catch (error) {
        setNotesResult([]);
      } finally {
        setIsSearching(false);
      }
    }
    setIsRefreshing(false);
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await search();
    setIsSearching(false);
  };

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        search();
      } else {
        setCardsResult([]);
        setDocumentsResult([]);
        setNotesResult([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <>
      {/* @ts-ignore */}
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        icon="arrow-left"
        onIconPress={() => navigation.goBack()}
        autoFocus
        style={{
          marginHorizontal: 5,
          backgroundColor: theme.background,
          color: theme.text,
        }}
        inputStyle={{
          color: theme.text,
        }}
        iconColor={theme.tint}
        placeholderTextColor={theme.secondaryText}
      />
      <View style={{ flex: 1 }}>
        {isSearching ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator color="green" size="large" />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            {!cardsResult.length &&
            !documentsResult.length &&
            !notesResult.length ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: theme.secondaryText }}>
                  Search to see data...
                </Text>
              </View>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  flex: 1,
                }}
                contentContainerStyle={{
                  marginHorizontal: 15,
                  paddingBottom: 20,
                }}
                refreshControl={
                  <RefreshControl
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{ color: theme.secondaryText, alignSelf: "center" }}
                  >
                    Note: Pull down to see changes
                  </Text>
                </View>
                {tabIndex === 0
                  ? cardsResult.map((cards) => (
                      <Card key={cards.id} theme={theme} item={cards} />
                    ))
                  : tabIndex === 1
                  ? documentsResult.map((item) => (
                      <DocumentCard key={item.id} theme={theme} item={item} />
                    ))
                  : notesResult.map((item) => (
                      <NoteCard key={item.id} theme={theme} item={item} />
                    ))}
              </ScrollView>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default SearchComponent;
