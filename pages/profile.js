import styled from "styled-components";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUser, useSetupProfile } from "../hooks/user/user";
import Loading from "../src/components/Loading";

export default function Profile() {
  const router = useRouter();

  const [stage, setStage] = useState("IGN-NOT-SET");
  const [id, setID] = useState("");

  const { register, handleSubmit, errors } = useForm();
  const { data, isError, isLoading } = useUser();
  const setupProfile = useSetupProfile();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && !data.data) {
      router.push("/login");
    } else if (!isLoading && !data.data.ign) {
      setStage("IGN-NOT-SET");
      setID(data.data._id);
    } else if (!isLoading && data.data.ign) {
      setStage("IGN-SET");
      setID(data.data._id);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [isLoading]);

  const onSubmit = async (data) => {
    const { isSuccess } = await setupProfile(id, data);
    if (isSuccess) {
      router.reload();
    } else {
      console.log("No setup, try again.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Head>
        <title>Profile | PvP HQ</title>
      </Head>

      {stage === "IGN-SET" ? (
        <Content1>
          <Cover></Cover>
          <FlexBox>
            <Avatar></Avatar>
            <FlexBox2>
              <IGN>{data?.data?.discordName || "IGN"}</IGN>
              <Role>
                {data?.data?.role === "USER" ? "Trainer" : "HQ Staff"}
              </Role>
            </FlexBox2>
          </FlexBox>
        </Content1>
      ) : (
        <Content2>
          <ProfileForm onSubmit={handleSubmit(onSubmit)}>
            <ProfileFormDiv className="form-control">
              <label>In Game Name</label>
              <input type="text" {...register("ign")} />
            </ProfileFormDiv>
            <ProfileDivHori>
              <ProfileFormDiv className="form-control">
                <label>Team</label>
                <select {...register("trainerTeam")}>
                  {["Valor", "Mystic", "Instinct"].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </ProfileFormDiv>
              <ProfileFormDiv className="form-control">
                <label>Trainer Code</label>
                <input type="text" {...register("trainerCode")} />
              </ProfileFormDiv>
            </ProfileDivHori>

            <ProfileFormDiv className="form-control">
              <label></label>
              <button type="submit">Set Up</button>
            </ProfileFormDiv>
          </ProfileForm>
        </Content2>
      )}
    </Container>
  );
}

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
  margin-top: 3.5rem;

  @media (max-width: 768px) {
    height: 95vh;
    margin-top: 1rem;
  }
`;

const Content1 = styled(motion.div)`
  background-color: ${({ theme }) => theme.primary0};
  border: solid 2px ${({ theme }) => theme.primary1};
  border-radius: 0.5rem;
  width: 90rem;
  height: 50rem;

  @media (max-width: 768px) {
    width: 95%;
    height: 98%;
    margin-top: 3rem;
  }
`;

const Content2 = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.primary0};
  border: solid 2px ${({ theme }) => theme.primary1};
  border-radius: 0.5rem;
  width: 90rem;
  height: 50rem;

  @media (max-width: 768px) {
    width: 95%;
    height: 98%;
    margin-top: 3rem;
  }
`;

const ProfileForm = styled(motion.form)`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 768px) {
    height: 98%;
    width: 95%;
  }
`;

const ProfileDivHori = styled(motion.div)`
  display: flex;
  width: 50rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (max-width: 768px) {
    width: 50%;
  }
`;

const ProfileFormDiv = styled(motion.div)`
  height: 6rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    label {
      font-size: 1rem;
    }

    input {
      width: 10rem;
    }

    select {
      width: 10rem;
    }

    button {
      width: 7rem;
    }
  }

  label {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.secondary2};
    text-transform: uppercase;
    font-family: "Poppins", sans-serif;
  }

  input {
    height: 3rem;
    width: 20rem;
    background-color: ${({ theme }) => theme.primary1};
    border: none;
    color: ${({ theme }) => theme.secondary1};
    font-family: "Poppins", sans-serif;
    font-size: 1.5rem;
    padding: 0 1rem;

    &:focus {
      background-color: ${({ theme }) => theme.primary2};
      outline: none;
    }
  }

  button {
    height: 3rem;
    width: 15rem;
    background-color: ${({ theme }) => theme.highlight0};
    border: none;
    color: ${({ theme }) => theme.secondary1};
    font-family: "Poppins", sans-serif;
    font-size: 1.5rem;
    padding: 0 1rem;
    margin-top: 2rem;
    cursor: pointer;
  }

  select {
    height: 3rem;
    width: 20rem;
    background-color: ${({ theme }) => theme.primary1};
    border: none;
    color: ${({ theme }) => theme.secondary1};
    font-family: "Poppins", sans-serif;
    font-size: 1.5rem;
    padding: 0 1rem;

    &:focus {
      background-color: ${({ theme }) => theme.primary2};
      outline: none;
    }
  }
`;

const Cover = styled(motion.div)`
  background-color: ${({ theme }) => theme.primary1};
  border-radius: 0.5rem 0.5rem 0 0;
  width: 100%;
  height: 15rem;

  @media (max-width: 768px) {
    height: 10rem;
  }
`;

const FlexBox = styled(motion.div)`
  display: flex;
  transform: translateY(-6rem);
  margin-left: 2rem;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    transform: translateY(-5rem);
    margin-left: 0rem;
  }
`;

const FlexBox2 = styled(motion.div)`
  align-items: center;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const Avatar = styled(motion.div)`
  border: solid 0.5rem ${({ theme }) => theme.primary0};
  background-color: ${({ theme }) => theme.primary1};
  width: 12rem;
  height: 12rem;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 7rem;
    border: solid 0.3rem ${({ theme }) => theme.primary0};
    height: 7rem;
  }
`;

const IGN = styled(motion.h1)`
  margin-left: 1rem;
  font-family: "Poppins", sans-serif;
  font-size: 2.5rem;
  font-weight: 400;
  transform: translateY(-1.5rem);

  @media (max-width: 768px) {
    font-size: 1.5rem;
    transform: translateY(0rem);
  }
`;

const Role = styled(motion.p)`
  margin-left: 0.5rem;
  font-family: "Poppins", sans-serif;
  font-size: 1rem;
  color: ${({ theme }) => theme.primary2};
  font-weight: 400;
  transform: translateY(-1rem);

  @media (max-width: 768px) {
    font-size: 0.7rem;
    transform: translateY(-0.2rem);
  }
`;
