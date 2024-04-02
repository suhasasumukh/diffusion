import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack,
  Image,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!prompt) {
      setError("Please provide a prompt.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
      setImage(response.data);
      setError("");
    } catch (error) {
      setError("An error occurred while generating the image. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Container>
        <Heading>Diffusion UI</Heading>
        <Text marginBottom="10px">
          This application is built on top of Diffusion to generate images using AI & ML. This GUI
          is made to generate images without the hassle of complex installation.
        </Text>

        <Wrap marginBottom="10px">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            width="350px"
            placeholder="Enter prompt"
            isInvalid={!!error}
          />
          <Button onClick={generate} colorScheme="yellow" isLoading={loading}>
            Generate
          </Button>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : image ? (
          <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
        ) : null}
        {error && (
          <Text color="red.500" marginTop="2" fontSize="sm">
            {error}
          </Text>
        )}
      </Container>
    </ChakraProvider>
  );
};

export default App;
